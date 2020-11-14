import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DailyReport } from './daily-report.entity';
import { DataImportConsole } from './data-import.console';
import { GitFileHash } from './git-file-hash.entity';
import { Region } from '../regions/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Region, DailyReport, GitFileHash])],
  providers: [DataImportConsole],
  exports: [DataImportConsole]
})
export class DataImportModule {}
