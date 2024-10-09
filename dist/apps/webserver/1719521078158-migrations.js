/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1719521078158 = void 0;
class Migrations1719521078158 {
    constructor() {
        this.name = 'Migrations1719521078158';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" ADD "birth_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ADD "study_modality" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" SET DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "younger" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "phone" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" ALTER COLUMN "curp" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "study_modality"`);
        await queryRunner.query(`ALTER TABLE "students" DROP COLUMN "birth_date"`);
    }
}
exports.Migrations1719521078158 = Migrations1719521078158;

})();

module.exports = __webpack_exports__;
/******/ })()
;