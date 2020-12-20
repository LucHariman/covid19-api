import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { AppService } from './app.service';
import { DailyReportsModule } from './daily-reports/daily-reports.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    ConsoleModule,
    TypeOrmModule.forRoot(),
    DailyReportsModule,
    CountriesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
