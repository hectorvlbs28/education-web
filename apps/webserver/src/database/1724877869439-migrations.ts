import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1724877869439 implements MigrationInterface {
    name = 'Migrations1724877869439'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."contracts_status_enum" AS ENUM('PENDING', 'PRE_APPROVED', 'REJECTED', 'VALIDATED')`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "status" "public"."contracts_status_enum" DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."contracts_status_enum"`);
    }

}
