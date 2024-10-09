/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Migrations1719261752222 = void 0;
class Migrations1719261752222 {
    constructor() {
        this.name = 'Migrations1719261752222';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "students" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "full_name" character varying NOT NULL, "email" character varying NOT NULL, "gender" character varying NOT NULL, "curp" character varying NOT NULL, "last_degree_study" character varying NOT NULL, "phone" character varying NOT NULL, "address" character varying NOT NULL, "nationality" character varying NOT NULL, "younger" boolean NOT NULL, "father_full_name" character varying, CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "students"`);
    }
}
exports.Migrations1719261752222 = Migrations1719261752222;

})();

module.exports = __webpack_exports__;
/******/ })()
;