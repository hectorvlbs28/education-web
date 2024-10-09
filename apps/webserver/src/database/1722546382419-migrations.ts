import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1722546382419 implements MigrationInterface {
    name = 'Migrations1722546382419'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "attachments" ("id" SERIAL NOT NULL, "media_type" character varying, "file_name" character varying, "name" character varying, "extension" character varying, "document_type" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachment_students" ("student_id" character varying NOT NULL, "attachment_id" integer NOT NULL, CONSTRAINT "PK_5ac6f6bdb203966884b790218b6" PRIMARY KEY ("student_id", "attachment_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1aeb159afbab0bf4bd19209a74" ON "attachment_students" ("student_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_78953d99da50aa83bf6e52d8af" ON "attachment_students" ("attachment_id") `);
        await queryRunner.query(`ALTER TABLE "attachment_students" ADD CONSTRAINT "FK_1aeb159afbab0bf4bd19209a749" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "attachment_students" ADD CONSTRAINT "FK_78953d99da50aa83bf6e52d8afa" FOREIGN KEY ("attachment_id") REFERENCES "attachments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "attachment_students" DROP CONSTRAINT "FK_78953d99da50aa83bf6e52d8afa"`);
        await queryRunner.query(`ALTER TABLE "attachment_students" DROP CONSTRAINT "FK_1aeb159afbab0bf4bd19209a749"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_78953d99da50aa83bf6e52d8af"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1aeb159afbab0bf4bd19209a74"`);
        await queryRunner.query(`DROP TABLE "attachment_students"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
    }

}
