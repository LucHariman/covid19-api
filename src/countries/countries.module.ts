import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locality } from './locality.entity';
import { LocalitiesController } from './localities.controller';
import { Country } from './country.entity';
import { CountriesController } from './countries.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Locality, Country])],
  controllers: [CountriesController, LocalitiesController]
})
export class CountriesModule {}
