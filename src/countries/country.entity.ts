import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Connection, ViewColumn, ViewEntity } from 'typeorm';
import { Locality } from './locality.entity';

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select('locality.iso2', 'iso2')
    .addSelect('locality.iso3', 'iso3')
    .addSelect('locality.region', 'name')
    .addSelect('sum(locality.population)', 'population')
    .from(Locality, 'locality')
    .where(`locality.iso3 <> ''`)
    .groupBy('locality.iso2, locality.iso3, locality.region')
})
export class Country {
  @ApiProperty()
  @ViewColumn()
  iso2: string;

  @ApiProperty()
  @ViewColumn()
  iso3: string;

  @ApiProperty()
  @ViewColumn()
  name: string;

  private _population: number;

  @ApiProperty()
  @Expose()
  @ViewColumn()
  get population() {
    return this._population;
  }

  set population(value: any) {
    this._population = +value;
  }
}