/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1720049960756 = void 0;
class Migrations1720049960756 {
    constructor() {
        this.name = 'Migrations1720049960756';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" ADD "user_id" character varying`);
        await queryRunner.query(`ALTER TABLE "students" ADD CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" DROP CONSTRAINT "FK_fb3eff90b11bddf7285f9b4e281"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "user_id"`);
    }
}
exports.Migrations1720049960756 = Migrations1720049960756;

})();

module.exports = __webpack_exports__;
/******/ })()
;