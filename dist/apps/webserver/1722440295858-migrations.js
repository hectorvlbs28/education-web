/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1722440295858 = void 0;
class Migrations1722440295858 {
    constructor() {
        this.name = 'Migrations1722440295858';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "document_id" character varying`);
        await queryRunner.query(`ALTER TABLE "contracts" ADD "signature" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "signature"`);
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "document_id"`);
    }
}
exports.Migrations1722440295858 = Migrations1722440295858;

})();

module.exports = __webpack_exports__;
/******/ })()
;