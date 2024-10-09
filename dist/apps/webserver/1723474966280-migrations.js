/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1723474966280 = void 0;
class Migrations1723474966280 {
    constructor() {
        this.name = 'Migrations1723474966280';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "payment_annual_id" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "payment_annual_id"`);
    }
}
exports.Migrations1723474966280 = Migrations1723474966280;

})();

module.exports = __webpack_exports__;
/******/ })()
;