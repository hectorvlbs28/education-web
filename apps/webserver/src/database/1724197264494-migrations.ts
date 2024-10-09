import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724197264494 implements MigrationInterface {
    name = 'Migrations1724197264494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."courses_course_category_enum" AS ENUM('SPECIALTY', 'NORMAL')`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "course_category" "public"."courses_course_category_enum"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "course_category"`);
        await queryRunner.query(`DROP TYPE "public"."courses_course_category_enum"`);
    }

}
