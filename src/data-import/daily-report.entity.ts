import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Locality } from "../countries/locality.entity";

@Entity()
export class DailyReport {
  @PrimaryColumn()
  day: number;

  @ManyToOne(() => Locality)
  locality: Locality;

  @PrimaryColumn()
  localityUid: number;

  @Column({ default: 0 })
  confirmed: number;

  @Column({ default: 0 })
  deaths: number;

  @Column({ default: 0 })
  recovered: number;

  // Removed since it is equal to confirmed - deaths - recovered
  // @Column({ nullable: true })
  // active: number;

  // Removed since it is equal to 100000 * confirmed / population
  // @Column('float8', { nullable: true })
  // incidenceRate: number;

  // Removed since it is equal to 100 * death / confirmed
  // @Column('float8', { nullable: true })
  // caseFatalityRatio: number;
}
