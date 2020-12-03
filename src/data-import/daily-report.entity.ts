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

  @Column({ nullable: true })
  confirmed: number;

  @Column({ nullable: true })
  deaths: number;

  @Column({ nullable: true })
  recovered: number;

  @Column({ nullable: true })
  active: number;

  @Column('float8', { nullable: true })
  incidenceRate: number;

  @Column('float8', { nullable: true })
  caseFatalityRatio: number;
}
