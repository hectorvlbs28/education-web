import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724107215730 implements MigrationInterface {
    name = 'Migrations1724107215730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_0696131b463263a1140cddf0aa0"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "UQ_0696131b463263a1140cddf0aa0"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_0696131b463263a1140cddf0aa0" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_0696131b463263a1140cddf0aa0"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "UQ_0696131b463263a1140cddf0aa0" UNIQUE ("course_id")`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_0696131b463263a1140cddf0aa0" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
