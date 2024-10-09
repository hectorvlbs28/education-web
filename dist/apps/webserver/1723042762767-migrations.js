/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1723042762767 = void 0;
class Migrations1723042762767 {
    constructor() {
        this.name = 'Migrations1723042762767';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "contracts" ADD "actived_contract" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "contracts" DROP COLUMN "actived_contract"`);
    }
}
exports.Migrations1723042762767 = Migrations1723042762767;

})();

module.exports = __webpack_exports__;
/******/ })()
;