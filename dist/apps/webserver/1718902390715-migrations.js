/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1718902390715 = void 0;
class Migrations1718902390715 {
    constructor() {
        this.name = 'Migrations1718902390715';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."tokens_type_enum" AS ENUM('session', 'refresh', 'sms_validation', 'mail_validation', 'otp', 'enterprise_register', 'recovery_password', 'confirm_token')`);
        await queryRunner.query(`CREATE TYPE "public"."tokens_status_enum" AS ENUM('active', 'revoked', 'expired')`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" character varying NOT NULL, "type" "public"."tokens_type_enum" NOT NULL, "status" "public"."tokens_status_enum" NOT NULL, "expiration" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "user_id" character varying, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_8769073e38c365f315426554ca5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_8769073e38c365f315426554ca5"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TYPE "public"."tokens_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."tokens_type_enum"`);
    }
}
exports.Migrations1718902390715 = Migrations1718902390715;

})();

module.exports = __webpack_exports__;
/******/ })()
;