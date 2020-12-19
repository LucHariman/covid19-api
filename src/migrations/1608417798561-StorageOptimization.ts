import {MigrationInterface, QueryRunner} from "typeorm";

export class StorageOptimization1608417798561 implements MigrationInterface {
    name = 'StorageOptimization1608417798561'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" DROP COLUMN "incidenceRate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_report" ADD "incidenceRate" double precision`);
    }

}
