import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Region } from "./region.entity";

@Entity()
export class DailyReport {
  @PrimaryColumn()
  day: number;

  @ManyToOne(() => Region)
  region: Region;

  @PrimaryColumn()
  regionUid: number;

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
