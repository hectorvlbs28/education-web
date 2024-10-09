import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722440295858 implements MigrationInterface {
    name = 'Migrations1722440295858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "document_id" character varying`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "signature" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "signature"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "document_id"`);
    }

}
