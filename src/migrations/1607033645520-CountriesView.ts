import {MigrationInterface, QueryRunner} from "typeorm";

export class CountriesView1607033645520 implements MigrationInterface {
    name = 'CountriesView1607033645520'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE VIEW "country" AS SELECT "locality"."region" AS "name", "locality"."iso2" AS "iso2", "locality"."iso3" AS "iso3", sum("locality"."population") AS "population" FROM "locality" "locality" WHERE "locality"."iso3" <> '' GROUP BY "locality"."iso2", "locality"."iso3", "locality"."region"`);
        await queryRunner.query(`INSERT INTO "typeorm_metadata"("type", "schema", "name", "value") VALUES ($1, $2, $3, $4)`, ["VIEW","public","country","SELECT \"locality\".\"region\" AS \"name\", \"locality\".\"iso2\" AS \"iso2\", \"locality\".\"iso3\" AS \"iso3\", sum(\"locality\".\"population\") AS \"population\" FROM \"locality\" \"locality\" WHERE \"locality\".\"iso3\" <> '' GROUP BY \"locality\".\"iso2\", \"locality\".\"iso3\", \"locality\".\"region\""]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "typeorm_metadata" WHERE "type" = 'VIEW' AND "schema" = $1 AND "name" = $2`, ["public","country"]);
        await queryRunner.query(`DROP VIEW "country"`);
    }

}
