import { Controller, Get, NotFoundException } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Transform } from 'class-transformer';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { DailyReport } from './daily-report.entity';

class GlobalReport {
  @ApiProperty({ example: '2020-12-25' })
  @Transform(value => moment(value).format('YYYY-MM-DD'), { toPlainOnly: true })
  day: Date;

  @ApiProperty()
  confirmed: number;

  @ApiProperty()
  deaths: number;

  @ApiProperty()
  recovered: number;

  static fromRaw(raw: any) {
    const { day, confirmed, deaths, recovered } = raw;
    return Object.assign(new GlobalReport(), <GlobalReport>{
      day,
      confirmed: +confirmed,
      deaths: +deaths,
      recovered: +recovered
    });
  }
}

@ApiTags('Reports')
@Controller('reports/global')
export class GlobalReportsController {
  constructor(
    @InjectRepository(DailyReport)
    private dailyReportsRepository: Repository<DailyReport>
  ) {}

  @Get()
  @ApiOkResponse({ type: [ GlobalReport ] })
  async getGlobal() { // TODO: Add filter and sort parameters
    const qb = this.createQueryBuilder();
    return (await qb.getRawMany()).map(GlobalReport.fromRaw);
  }

  @Get('latest')
  @ApiOkResponse({ type: GlobalReport })
  async getLatestGlobal() {
    const qb = this.createQueryBuilder();
    qb.orderBy('day', 'DESC')
    const report = await qb.getRawOne();
    if (!report) {
      throw new NotFoundException();
    }
    return GlobalReport.fromRaw(report);
  }

  private createQueryBuilder(alias: string = 'dailyReport') {
    return this.dailyReportsRepository.createQueryBuilder(alias)
    .select('dailyReport.day', 'day')
    .addSelect('sum(dailyReport.confirmed)', 'confirmed')
    .addSelect('sum(dailyReport.deaths)', 'deaths')
    .addSelect('sum(dailyReport.recovered)', 'recovered')
    .groupBy('dailyReport.day');
  }
}
