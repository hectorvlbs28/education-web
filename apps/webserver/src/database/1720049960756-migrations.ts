import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720049960756 implements MigrationInterface {
    name = 'Migrations1720049960756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" ADD "user_id" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "user_id"`);
    }

}
