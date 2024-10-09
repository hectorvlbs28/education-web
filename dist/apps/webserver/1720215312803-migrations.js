/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1720215312803 = void 0;
class Migrations1720215312803 {
    constructor() {
        this.name = 'Migrations1720215312803';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "contracts" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "student_name" character varying NOT NULL, "school_name" character varying NOT NULL, "date_birth_student" TIMESTAMP NOT NULL, "curp" character varying, "student_phone" character varying NOT NULL, "scholarship" character varying NOT NULL, "start_date_service" TIMESTAMP NOT NULL, "modality" character varying NOT NULL, "annual_registration" character varying NOT NULL, "monthly_payments" json NOT NULL, CONSTRAINT "PK_2c7b8f3a7b1acdd49497d83d0fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "students" ADD "contract_id" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "UQ_dd43bc2bcee907785491562d717" UNIQUE ("contract_id")`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_dd43bc2bcee907785491562d717" FOREIGN KEY ("contract_id") REFERENCES "contracts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_dd43bc2bcee907785491562d717"`);
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "UQ_dd43bc2bcee907785491562d717"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "contract_id"`);
        await queryRunner.query(`DROP TABLE "contracts"`);
    }
}
exports.Migrations1720215312803 = Migrations1720215312803;

})();

module.exports = __webpack_exports__;
/******/ })()
;