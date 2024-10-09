import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724945690815 implements MigrationInterface {
    name = 'Migrations1724945690815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "avatar" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "avatar"`);
    }

}
