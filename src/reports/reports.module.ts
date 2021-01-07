import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReport } from './daily-report.entity';
import { DataImportConsole } from './data-import.console';
import { GitFileHash } from './git-file-hash.entity';
import { Locality } from '../countries/locality.entity';
import { GlobalReportsController } from './global-reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Locality, DailyReport, GitFileHash])],
  providers: [DataImportConsole],
  exports: [DataImportConsole],
  controllers: [GlobalReportsController]
})
export class ReportsModule {}
