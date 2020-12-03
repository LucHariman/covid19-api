import { InjectRepository } from "@nestjs/typeorm";
import axios from 'axios';
import * as parse from 'csv-parse';
import * as moment from 'moment';
import { Command, Console, createSpinner } from "nestjs-console";
import * as stream from 'stream';
import { Repository } from "typeorm";
import { DailyReport } from "./daily-report.entity";
import { GitFileHash } from "./git-file-hash.entity";
import { Locality } from "../countries/locality.entity";

const API_GITHUB_BASE_URL = 'https://api.github.com';
const CSSE_REPOSITORY_URI = 'CSSEGISandData/COVID-19';
const DATA_FOLDER = 'csse_covid_19_data';
const LOCALITIES_CSV_PATH = `${DATA_FOLDER}/UID_ISO_FIPS_LookUp_Table.csv`;
const DAILY_REPORT_FOLDER_PATH = `${DATA_FOLDER}/csse_covid_19_daily_reports`;

@Console()
export class DataImportConsole {
  constructor(
    @InjectRepository(Locality)
    private localitiesRepository: Repository<Locality>,
    @InjectRepository(DailyReport)
    private dailyReportsRepository: Repository<DailyReport>,
    @InjectRepository(GitFileHash)
    private gitFileHashesRepository: Repository<GitFileHash>
  ) {}

  @Command({
    command: 'update-from-sources',
    description: 'Update data from sources'
  })
  async updateFromSources(): Promise<void> {
    const spin = createSpinner();

    spin.start(`Updating data`);
    const dataFolderDetails = await this.getFileDetails(DATA_FOLDER);
    const fileDetails = dataFolderDetails.find(e => e.path === LOCALITIES_CSV_PATH);
    const gitFileHash = await this.gitFileHashesRepository.findOne({ fileUri: fileDetails.path });
    if (!(gitFileHash && gitFileHash.hash === fileDetails.sha)) {
      await this.updateLocalityList();
      await this.gitFileHashesRepository.save({ fileUri: LOCALITIES_CSV_PATH, hash: fileDetails.sha });
      spin.info('Localities updated');
    }

    spin.text = 'Updating daily report';
    const localitiesMap = new Map();
    const localities = await this.localitiesRepository.find();
    for (const locality of localities) {
      localitiesMap.set(locality.combinedKey, locality.uid);
    }
    const dailyReportsFolderDetails = await this.getFileDetails(DAILY_REPORT_FOLDER_PATH);
    for (const fileDetails of dailyReportsFolderDetails) {
      const m = fileDetails.name.match(/^(\d{2})\-(\d{2})\-(\d{4})\.csv$/);
      if (!m) {
        continue;
      }
      const [, month, day, year] = m;
      const gitFileHash = await this.gitFileHashesRepository.findOne({ fileUri: fileDetails.path });
      if (gitFileHash && gitFileHash.hash === fileDetails.sha) {
        continue;
      }
      try {
        await this.updateDailyReport(localitiesMap, new Date(`${year}-${month}-${day}`));
      } catch (error) {
        console.error(error.message);
        continue;
      }
      await this.gitFileHashesRepository.save({ fileUri: fileDetails.path, hash: fileDetails.sha });
      spin.info('Daily report imported from ' + fileDetails.name);
    }
    spin.succeed('Data updated');
  }

  private async updateLocalityList() {
    const localities = await this.parseRemoteCSVFile<Locality>(LOCALITIES_CSV_PATH, content => {
      const locality = new Locality();
      locality.uid = +content['UID'];
      locality.combinedKey = content['Combined_Key'];
      locality.iso2 = content['iso2'];
      locality.iso3 = content['iso3'];
      locality.admin2 = content['Admin2'];
      locality.state = content['Province_State'];
      locality.region = content['Country_Region'];
      locality.population = +content['Population'];
      locality.lat = content['Lat'] && parseFloat(content['Lat']) || null;
      locality.lng = content['Long_'] && parseFloat(content['Long_']) || null;
      return locality;
    });
    await this.localitiesRepository.save(localities);
  }

  private async getFileDetails(directoryUri: string) {
    const response = await axios.get(`${API_GITHUB_BASE_URL}/repos/${CSSE_REPOSITORY_URI}/contents/${directoryUri}`);
    return response.data as any[];
  }

  private async updateDailyReport(localitiesMap: Map<string, number>, day: Date) {
    const dayKey = Math.floor(day.getTime() / 1e3);
    const reports = await this.parseRemoteCSVFile<DailyReport>(
      `${DAILY_REPORT_FOLDER_PATH}/${moment(day).format('MM-DD-YYYY')}.csv`,
      content => {
        const localityUid = localitiesMap.get(content['Combined_Key']);
        if (!localityUid) {
          return null;
        }
        const m = moment.utc(content['Last_Update'], true);
        const report = new DailyReport();
        report.day = dayKey;
        report.localityUid = localityUid;
        report.confirmed = parseInt(content['Confirmed']) || null;
        report.deaths = parseInt(content['Deaths']) || null;
        report.recovered = parseInt(content['Recovered']) || null;
        report.active = content['Active'] && parseInt(content['Active']) || null;
        report.incidenceRate = content['Incidence_Rate'] && parseFloat(content['Incidence_Rate']) || null;
        report.caseFatalityRatio = content['Case-Fatality_Ratio'] && parseFloat(content['Case-Fatality_Ratio']) || null;
        return report;
      }
    );
    await this.dailyReportsRepository.delete({ day: dayKey });
    await this.dailyReportsRepository.save(reports);
  }

  private async parseRemoteCSVFile<T>(path: string, transformFn: (content: any) => T) {
    const url = [ 'https://raw.githubusercontent.com', CSSE_REPOSITORY_URI, 'master', path ].join('/');
    const response = await axios.get(url, { responseType: 'stream' });
    return new Promise<T[]>((resolve, reject) => {
      let header = null;
      const result: T[] = [];
      const parser = parse().on('readable', async () => {
        let record = null;
        while (record = parser.read()) {
          if (!header) {
            header = record;
          } else {
            const content: any = {};
            for (let i in header) {
              content[header[i]] = record[i];
            }
            const t = transformFn(content);
            if (t) {
              result.push(t);
            }
          }
        }
      })
      .on('end', () => resolve(result))
      .on('error', reject);
      (response.data as stream.Readable).pipe(parser);
    });
  }
}
