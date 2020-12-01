import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Region {
  @ApiProperty()
  @PrimaryColumn()
  uid: number;

  @ApiProperty()
  @Column({ unique: true })
  combinedKey: string;

  @ApiProperty()
  @Column()
  admin2: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  region: string;

  @ApiProperty()
  @Column()
  iso2: string;

  @ApiProperty()
  @Column()
  iso3: string;

  @ApiProperty()
  @Column()
  population: number;

  @ApiPropertyOptional()
  @Column('float8', { nullable: true })
  lat: number;

  @ApiPropertyOptional()
  @Column('float8', { nullable: true })
  lng: number;
}