import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1719261752222 implements MigrationInterface {
    name = 'Migrations1719261752222'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "students" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "gender" character varying NOT NULL, "curp" character varying NOT NULL, "last_degree_study" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "nationality" character varying NOT NULL, "younger" boolean NOT NULL, "father_full_name" character varying, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "students"`);
    }

}
