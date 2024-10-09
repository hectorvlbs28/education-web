/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 180:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppDataSource = void 0;
const tslib_1 = __webpack_require__(1);
const dotenv = tslib_1.__importStar(__webpack_require__(181));
__webpack_require__(182);
const path = tslib_1.__importStar(__webpack_require__(45));
const typeorm_1 = __webpack_require__(11);
const relative = path.join(path.relative('.', __dirname), '..');
dotenv.config({ path: `${relative}/.env` });
const options = {
    type: 'postgres',
    host: process.env.MAIN_DB_HOST,
    port: parseInt(process.env.MAIN_DB_PORT, 10),
    username: process.env.MAIN_DB_USERNAME,
    password: process.env.MAIN_DB_PASSWORD,
    database: process.env.MAIN_DB_NAME,
    logging: process.env.MAIN_DB_LOGGING === '1',
    synchronize: process.env.MAIN_DB_SYNC === '1',
    migrationsTableName: 'migrations',
    entities: [`apps/webserver/src/modules/**/*.entity.ts`],
    migrations: [`${relative}/webserver/*-migrations*{.ts,.js}`],
};
exports.AppDataSource = new typeorm_1.DataSource(options);
exports.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
})
    .catch((err) => {
    console.log(options);
    console.error('Error during Data Source initialization:', err);
});


/***/ }),

/***/ 181:
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ 182:
/***/ ((module) => {

module.exports = require("reflect-metadata");

/***/ }),

/***/ 1:
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ 11:
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ 45:
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(180);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;