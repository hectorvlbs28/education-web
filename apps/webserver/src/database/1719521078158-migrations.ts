import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719521078158 implements MigrationInterface {
    name = 'Migrations1719521078158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "birth_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD "study_modality" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "study_modality"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birth_date"`);
    }

}
