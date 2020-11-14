import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Region {
  @PrimaryColumn()
  uid: number;

  @Column({ unique: true })
  combinedKey: string;

  @Column()
  admin2: string;

  @Column()
  state: string;

  @Column()
  region: string;

  @Column()
  iso2: string;

  @Column()
  iso3: string;

  @Column()
  population: number;

  @Column('float8', { nullable: true })
  lat: number;

  @Column('float8', { nullable: true })
  lng: number;
}