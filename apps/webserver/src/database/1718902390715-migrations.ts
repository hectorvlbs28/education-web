import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1718902390715 implements MigrationInterface {
    name = 'Migrations1718902390715'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tokens_type_enum" AS ENUM('session', 'refresh', 'sms_validation', 'mail_validation', 'otp', 'enterprise_register', 'recovery_password', 'confirm_token')`);
        await queryRunner.query(`CREATE TYPE "public"."tokens_status_enum" AS ENUM('active', 'revoked', 'expired')`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "type" "public"."tokens_type_enum" NOT NULL, "status" "public"."tokens_status_enum" NOT NULL, "expiration" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "user_id" character varying, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TYPE "public"."tokens_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tokens_type_enum"`);
    }

}
