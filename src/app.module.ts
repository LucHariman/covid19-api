import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { AppService } from './app.service';
import { DataImportModule } from './data-import/data-import.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    ConsoleModule,
    TypeOrmModule.forRoot(),
    DataImportModule,
    CountriesModule,
  ],
  providers: [AppService],
})
export class AppModule {}
