import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720215312803 implements MigrationInterface {
    name = 'Migrations1720215312803'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "contracts" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "student_name" character varying NOT NULL, "school_name" character varying NOT NULL, "date_birth_student" TIMESTAMP NOT NULL, "curp" character varying, "student_phone" character varying NOT NULL, "scholarship" character varying NOT NULL, "start_date_service" TIMESTAMP NOT NULL, "modality" character varying NOT NULL, "annual_registration" character varying NOT NULL, "monthly_payments" json NOT NULL, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students" ADD "contract_id" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "UQ_dd43bc2bcee907785491562d717" UNIQUE ("contract_id")`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_dd43bc2bcee907785491562d717" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_dd43bc2bcee907785491562d717"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "UQ_dd43bc2bcee907785491562d717"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "contract_id"`);
        await queryRunner.query(`DROP TABLE "contracts"`);
    }

}
