import {MigrationInterface, QueryRunner} from "typeorm";

export class StorageOptimization1608417263544 implements MigrationInterface {
    name = 'StorageOptimization1608417263544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" DROP COLUMN "active"`);
        await queryRunner.query(`ALTER TABLE "daily_report" DROP COLUMN "caseFatalityRatio"`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "confirmed" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_report"."confirmed" IS NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "confirmed" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "deaths" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_report"."deaths" IS NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "deaths" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "recovered" SET NOT NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_report"."recovered" IS NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "recovered" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "recovered" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_report"."recovered" IS NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "recovered" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "deaths" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_report"."deaths" IS NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "deaths" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "confirmed" DROP DEFAULT`);
        await queryRunner.query(`COMMENT ON COLUMN "daily_report"."confirmed" IS NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ALTER COLUMN "confirmed" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD "caseFatalityRatio" double precision`);
        await queryRunner.query(`ALTER TABLE "daily_report" ADD "active" integer`);
    }

}
