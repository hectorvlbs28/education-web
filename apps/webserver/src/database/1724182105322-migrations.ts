import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724182105322 implements MigrationInterface {
    name = 'Migrations1724182105322'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "discount" integer DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "discount"`);
    }

}
