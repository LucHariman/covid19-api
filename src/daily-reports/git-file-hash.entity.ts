import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class GitFileHash {
  @PrimaryColumn({ length: 255 })
  fileUri: string;

  @Column()
  hash: string;
}
