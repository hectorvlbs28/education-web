import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723042762767 implements MigrationInterface {
    name = 'Migrations1723042762767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "actived_contract" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "actived_contract"`);
    }

}
