import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialization1605386432304 implements MigrationInterface {
    name = 'Initialization1605386432304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "region" ("uid" integer NOT NULL, "combinedKey" character varying NOT NULL, "admin2" character varying NOT NULL, "state" character varying NOT NULL, "region" character varying NOT NULL, "iso2" character varying NOT NULL, "iso3" character varying NOT NULL, "population" integer NOT NULL, "lat" double precision, "lng" double precision, CONSTRAINT "UQ_c4e4578f2b8cc8a228de77e604f" UNIQUE ("combinedKey"), CONSTRAINT "PK_98d85a0b4fc3edad0f56904516a" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "daily_report" ("day" integer NOT NULL, "regionUid" integer NOT NULL, "confirmed" integer, "deaths" integer, "recovered" integer, "active" integer, "incidenceRate" double precision, "caseFatalityRatio" double precision, CONSTRAINT "PK_273bc55b5a8c60019c6fd5f3c86" PRIMARY KEY ("day", "regionUid"))`);
        await queryRunner.query(`CREATE TABLE "git_file_hash" ("fileUri" character varying(255) NOT NULL, "hash" character varying NOT NULL, CONSTRAINT "PK_2f9dd85f179b9ccbe69f3b0ce07" PRIMARY KEY ("fileUri"))`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD CONSTRAINT "FK_2506bae9567f91c4c87fb791f72" FOREIGN KEY ("regionUid") REFERENCES "region"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" DROP CONSTRAINT "FK_2506bae9567f91c4c87fb791f72"`);
        await queryRunner.query(`DROP TABLE "git_file_hash"`);
        await queryRunner.query(`DROP TABLE "daily_report"`);
        await queryRunner.query(`DROP TABLE "region"`);
    }

}
