import {MigrationInterface, QueryRunner} from "typeorm";

export class DayConversion1608585326153 implements MigrationInterface {
    name = 'DayConversion1608585326153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" DROP CONSTRAINT "PK_aa6aea87b583ee411f538f746b6"`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD CONSTRAINT "PK_6587aea7a51c97c2ef65962e4d2" PRIMARY KEY ("localityUid")`);
        await queryRunner.query(`ALTER TABLE "daily_report" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD "day" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" DROP CONSTRAINT "PK_6587aea7a51c97c2ef65962e4d2"`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD CONSTRAINT "PK_aa6aea87b583ee411f538f746b6" PRIMARY KEY ("localityUid", "day")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" DROP CONSTRAINT "PK_aa6aea87b583ee411f538f746b6"`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD CONSTRAINT "PK_6587aea7a51c97c2ef65962e4d2" PRIMARY KEY ("localityUid")`);
        await queryRunner.query(`ALTER TABLE "daily_report" DROP COLUMN "day"`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD "day" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" DROP CONSTRAINT "PK_6587aea7a51c97c2ef65962e4d2"`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD CONSTRAINT "PK_aa6aea87b583ee411f538f746b6" PRIMARY KEY ("day", "localityUid")`);
    }

}
