import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723474966280 implements MigrationInterface {
    name = 'Migrations1723474966280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "payment_annual_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "payment_annual_id"`);
    }

}
