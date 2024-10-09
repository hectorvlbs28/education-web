import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1723837410883 implements MigrationInterface {
    name = 'Migrations1723837410883'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" ADD "registration" numeric DEFAULT '2950'`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "monthly_payment" json DEFAULT '[{"amount":"1800","level":"1","paymentDate":null},{"amount":"1830","level":"2","paymentDate":null},{"amount":"1860","level":"3","paymentDate":null},{"amount":"1890","level":"4","paymentDate":null},{"amount":"1920","level":"5","paymentDate":null}]'`);
        await queryRunner.query(`ALTER TABLE "courses" ADD "start_date" json`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "start_date"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "monthly_payment"`);
        await queryRunner.query(`ALTER TABLE "courses" DROP COLUMN "registration"`);
    }

}
