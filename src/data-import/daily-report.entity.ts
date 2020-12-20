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
}
