import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722985881742 implements MigrationInterface {
    name = 'Migrations1722985881742'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_dd43bc2bcee907785491562d717"`);
        await queryRunner.query(`CREATE TABLE "courses" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "name" character varying NOT NULL, "description" character varying, CONSTRAINT "PK_3f70a487cc718ad8eda4e6d58c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "zip_code" integer NOT NULL, "city" character varying NOT NULL, "country" character varying NOT NULL, "state" character varying NOT NULL, "street_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachment_courses" ("course_id" character varying NOT NULL, "attachment_id" integer NOT NULL, CONSTRAINT "PK_2a0b8a68faa50dfcca433039370" PRIMARY KEY ("course_id", "attachment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7cf7cfe2fe91c58c9a2998e6da" ON "attachment_courses" ("course_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_272710f1a0aabd3255839d260f" ON "attachment_courses" ("attachment_id") `);
        await queryRunner.query(`CREATE TABLE "student_courses" ("student_id" character varying NOT NULL, "course_id" character varying NOT NULL, CONSTRAINT "PK_834b9778e4a42da3ee6f69ea6ac" PRIMARY KEY ("student_id", "course_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_72bf56a78827a9ef805699a360" ON "student_courses" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_aef3395fbde21c0c377cb836d0" ON "student_courses" ("course_id") `);
        await queryRunner.query(`CREATE TABLE "address_students" ("student_id" character varying NOT NULL, "address_id" integer NOT NULL, CONSTRAINT "PK_c6d55cee7f3a239e341d6b0febd" PRIMARY KEY ("student_id", "address_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f4bf85002223eb3ca9175d7ee0" ON "address_students" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_dae3ce6f4dfe77ac009a27479f" ON "address_students" ("address_id") `);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "UQ_dd43bc2bcee907785491562d717"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "contract_id"`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "course_id" character varying`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "UQ_0696131b463263a1140cddf0aa0" UNIQUE ("course_id")`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD CONSTRAINT "FK_0696131b463263a1140cddf0aa0" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachment_courses" ADD CONSTRAINT "FK_7cf7cfe2fe91c58c9a2998e6daf" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attachment_courses" ADD CONSTRAINT "FK_272710f1a0aabd3255839d260f5" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_courses" ADD CONSTRAINT "FK_72bf56a78827a9ef805699a3609" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "student_courses" ADD CONSTRAINT "FK_aef3395fbde21c0c377cb836d08" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "address_students" ADD CONSTRAINT "FK_f4bf85002223eb3ca9175d7ee01" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "address_students" ADD CONSTRAINT "FK_dae3ce6f4dfe77ac009a27479ff" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address_students" DROP CONSTRAINT "FK_dae3ce6f4dfe77ac009a27479ff"`);
        await queryRunner.query(`ALTER TABLE "address_students" DROP CONSTRAINT "FK_f4bf85002223eb3ca9175d7ee01"`);
        await queryRunner.query(`ALTER TABLE "student_courses" DROP CONSTRAINT "FK_aef3395fbde21c0c377cb836d08"`);
        await queryRunner.query(`ALTER TABLE "student_courses" DROP CONSTRAINT "FK_72bf56a78827a9ef805699a3609"`);
        await queryRunner.query(`ALTER TABLE "attachment_courses" DROP CONSTRAINT "FK_272710f1a0aabd3255839d260f5"`);
        await queryRunner.query(`ALTER TABLE "attachment_courses" DROP CONSTRAINT "FK_7cf7cfe2fe91c58c9a2998e6daf"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "FK_0696131b463263a1140cddf0aa0"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP CONSTRAINT "UQ_0696131b463263a1140cddf0aa0"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "course_id"`);
        await queryRunner.query(`ALTER TABLE "students" ADD "contract_id" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "UQ_dd43bc2bcee907785491562d717" UNIQUE ("contract_id")`);
        await queryRunner.query(`ALTER TABLE "students" ADD "address" character varying NOT NULL`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dae3ce6f4dfe77ac009a27479f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f4bf85002223eb3ca9175d7ee0"`);
        await queryRunner.query(`DROP TABLE "address_students"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_aef3395fbde21c0c377cb836d0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_72bf56a78827a9ef805699a360"`);
        await queryRunner.query(`DROP TABLE "student_courses"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_272710f1a0aabd3255839d260f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7cf7cfe2fe91c58c9a2998e6da"`);
        await queryRunner.query(`DROP TABLE "attachment_courses"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "courses"`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_dd43bc2bcee907785491562d717" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
