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
  @ViewColumn()
  iso2: string;

  @ViewColumn()
  iso3: string;

  @ViewColumn()
  name: string;
}