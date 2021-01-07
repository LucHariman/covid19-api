import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { AppService } from './app.service';
import { ReportsModule } from './reports/reports.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    ConsoleModule,
    TypeOrmModule.forRoot(),
    ReportsModule,
    CountriesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
