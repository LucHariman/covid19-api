import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialization1607031139215 implements MigrationInterface {
    name = 'Initialization1607031139215'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "locality" ("uid" integer NOT NULL, "combinedKey" character varying NOT NULL, "admin2" character varying NOT NULL, "state" character varying NOT NULL, "region" character varying NOT NULL, "iso2" character varying NOT NULL, "iso3" character varying NOT NULL, "population" integer NOT NULL, "lat" double precision, "lng" double precision, CONSTRAINT "UQ_81401bff1434bbe4e8057a77c85" UNIQUE ("combinedKey"), CONSTRAINT "PK_3657edfe772249f9b2ade2fc0fc" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`CREATE TABLE "daily_report" ("day" integer NOT NULL, "localityUid" integer NOT NULL, "confirmed" integer, "deaths" integer, "recovered" integer, "active" integer, "incidenceRate" double precision, "caseFatalityRatio" double precision, CONSTRAINT "PK_aa6aea87b583ee411f538f746b6" PRIMARY KEY ("day", "localityUid"))`);
        await queryRunner.query(`CREATE TABLE "git_file_hash" ("fileUri" character varying(255) NOT NULL, "hash" character varying NOT NULL, CONSTRAINT "PK_2f9dd85f179b9ccbe69f3b0ce07" PRIMARY KEY ("fileUri"))`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD CONSTRAINT "FK_6587aea7a51c97c2ef65962e4d2" FOREIGN KEY ("localityUid") REFERENCES "locality"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" DROP CONSTRAINT "FK_6587aea7a51c97c2ef65962e4d2"`);
        await queryRunner.query(`DROP TABLE "git_file_hash"`);
        await queryRunner.query(`DROP TABLE "daily_report"`);
        await queryRunner.query(`DROP TABLE "locality"`);
    }

}
