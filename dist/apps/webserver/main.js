/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_module_1 = __webpack_require__(8);
const core_module_1 = __webpack_require__(44);
const config_options_1 = __webpack_require__(113);
const config_module_1 = __webpack_require__(47);
const auth_module_1 = __webpack_require__(92);
const token_module_1 = __webpack_require__(100);
const student_module_1 = __webpack_require__(117);
const stripe_module_1 = __webpack_require__(163);
let MainModule = class MainModule {
};
exports.MainModule = MainModule;
exports.MainModule = MainModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_module_1.ConfigModule.forRoot(config_options_1.options),
            core_module_1.CoreModule,
            user_module_1.UserModule,
            token_module_1.TokenModule,
            student_module_1.StudentModule,
            stripe_module_1.StripeModule,
        ],
    })
], MainModule);


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(10);
const custom_providers_1 = __webpack_require__(22);
const core_module_1 = __webpack_require__(44);
const check_user_allowed_1 = __webpack_require__(73);
const create_user_1 = __webpack_require__(76);
const user_controller_1 = __webpack_require__(78);
const auth_module_1 = __webpack_require__(92);
const user_profile_1 = __webpack_require__(91);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [user_controller_1.UserController],
        exports: [check_user_allowed_1.CheckUserAllowed],
        imports: [
            core_module_1.CoreModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            (0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [custom_providers_1.userRepository, check_user_allowed_1.CheckUserAllowed, create_user_1.CreateUser, user_profile_1.UserProfile],
    })
], UserModule);


/***/ }),
/* 9 */
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(12);
let UserEntity = class UserEntity extends user_entity_1.UserEntity {
};
exports.UserEntity = UserEntity;
exports.UserEntity = UserEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const core_orm_entity_1 = __webpack_require__(13);
const token_entity_1 = __webpack_require__(14);
const student_entity_1 = __webpack_require__(17);
let UserEntity = class UserEntity extends core_orm_entity_1.CoreORMEntity {
    constructor(aggregate) {
        super();
        if (aggregate) {
            const parsedEntity = JSON.parse(JSON.stringify(aggregate));
            Object.assign(this, parsedEntity);
            if (parsedEntity.tokens) {
                this.tokens = parsedEntity.tokens.map((token) => new token_entity_1.TokenEntity(token));
            }
            if (parsedEntity.students) {
                this.students = parsedEntity.students.map((student) => new student_entity_1.StudentEntity(student));
            }
        }
    }
};
exports.UserEntity = UserEntity;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'name' }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'email' }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'password' }),
    tslib_1.__metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => token_entity_1.TokenEntity, (token) => token.user, {
        cascade: true,
        eager: true,
    }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "tokens", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToMany)(() => student_entity_1.StudentEntity, (student) => student.user, {
        cascade: true,
        eager: true,
    }),
    tslib_1.__metadata("design:type", Array)
], UserEntity.prototype, "students", void 0);
exports.UserEntity = UserEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'users' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserEntity);


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreORMEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
class CoreORMEntity extends typeorm_1.BaseEntity {
    removeEmptyArrays(jsonEntity) {
        Object.keys(jsonEntity).map((item) => {
            if (Array.isArray(jsonEntity[item]) && jsonEntity[item].length === 0) {
                delete jsonEntity[item];
            }
        });
        return jsonEntity;
    }
}
exports.CoreORMEntity = CoreORMEntity;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', primary: true }),
    tslib_1.__metadata("design:type", String)
], CoreORMEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], CoreORMEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'updated_at',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], CoreORMEntity.prototype, "updatedAt", void 0);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const token_types_enum_1 = __webpack_require__(15);
const token_status_enum_1 = __webpack_require__(16);
const user_entity_1 = __webpack_require__(12);
let TokenEntity = class TokenEntity {
    constructor(aggregate) {
        if (aggregate !== undefined) {
            this.id = aggregate.id;
            this.token = aggregate.value;
            this.status = aggregate.status;
            this.type = aggregate.type;
            this.expiration = aggregate.expiration;
            this.updatedAt = aggregate.updatedAt;
            this.createdAt = aggregate.createdAt;
        }
    }
};
exports.TokenEntity = TokenEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    tslib_1.__metadata("design:type", Number)
], TokenEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar' }),
    tslib_1.__metadata("design:type", String)
], TokenEntity.prototype, "token", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: token_types_enum_1.TokenTypes }),
    tslib_1.__metadata("design:type", typeof (_a = typeof token_types_enum_1.TokenTypes !== "undefined" && token_types_enum_1.TokenTypes) === "function" ? _a : Object)
], TokenEntity.prototype, "type", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: token_status_enum_1.TokenStatus }),
    tslib_1.__metadata("design:type", typeof (_b = typeof token_status_enum_1.TokenStatus !== "undefined" && token_status_enum_1.TokenStatus) === "function" ? _b : Object)
], TokenEntity.prototype, "status", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], TokenEntity.prototype, "expiration", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.tokens, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", typeof (_d = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _d : Object)
], TokenEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], TokenEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'updated_at',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], TokenEntity.prototype, "updatedAt", void 0);
exports.TokenEntity = TokenEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'tokens' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], TokenEntity);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenTypes = void 0;
var TokenTypes;
(function (TokenTypes) {
    TokenTypes["SESSION"] = "session";
    TokenTypes["REFRESH"] = "refresh";
    TokenTypes["SMS_VALIDATION"] = "sms_validation";
    TokenTypes["MAIL_VALIDATION"] = "mail_validation";
    TokenTypes["OTP"] = "otp";
    TokenTypes["ENTERPRISE_REGISTER"] = "enterprise_register";
    TokenTypes["RECOVERY_PASSWORD"] = "recovery_password";
    TokenTypes["CONFIRM_TOKEN"] = "confirm_token";
})(TokenTypes || (exports.TokenTypes = TokenTypes = {}));


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenStatus = void 0;
var TokenStatus;
(function (TokenStatus) {
    TokenStatus["ACTIVE"] = "active";
    TokenStatus["REVOKED"] = "revoked";
    TokenStatus["EXPIRED"] = "expired";
})(TokenStatus || (exports.TokenStatus = TokenStatus = {}));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const core_orm_entity_1 = __webpack_require__(13);
const user_entity_1 = __webpack_require__(12);
const attachment_entity_1 = __webpack_require__(18);
const course_entity_1 = __webpack_require__(19);
const address_entity_1 = __webpack_require__(21);
let StudentEntity = class StudentEntity extends core_orm_entity_1.CoreORMEntity {
    constructor(aggregate) {
        super();
        if (aggregate) {
            const parsedEntity = JSON.parse(JSON.stringify(aggregate));
            Object.assign(this, parsedEntity);
            if (parsedEntity.courses) {
                this.courses = parsedEntity.courses.map((course) => new course_entity_1.CourseEntity(course));
            }
            if (parsedEntity.attachments) {
                this.attachments = parsedEntity.attachments.map((att) => new attachment_entity_1.AttachmentEntity(att));
            }
            if (parsedEntity.addresses) {
                this.addresses = parsedEntity.addresses.map((address) => new address_entity_1.AddressEntity(address));
            }
        }
    }
};
exports.StudentEntity = StudentEntity;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'full_name' }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'email' }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "email", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'birth_date' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], StudentEntity.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'gender' }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'curp', nullable: true }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "curp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'last_degree_study' }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "lastDegreeStudy", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'phone', nullable: true }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'nationality' }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "nationality", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'study_modality' }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "studyModality", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'younger', default: false }),
    tslib_1.__metadata("design:type", Boolean)
], StudentEntity.prototype, "younger", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'father_full_name', nullable: true }),
    tslib_1.__metadata("design:type", String)
], StudentEntity.prototype, "fatherFullName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.students, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'user_id' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _b : Object)
], StudentEntity.prototype, "user", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => course_entity_1.CourseEntity, (course) => course.students, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'student_courses',
        joinColumn: { name: 'student_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'course_id', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], StudentEntity.prototype, "courses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => address_entity_1.AddressEntity, (address) => address.students, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'address_students',
        joinColumn: { name: 'student_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'address_id', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], StudentEntity.prototype, "addresses", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => attachment_entity_1.AttachmentEntity, (attachment) => attachment.students, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'attachment_students',
        joinColumn: { name: 'student_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'attachment_id', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], StudentEntity.prototype, "attachments", void 0);
exports.StudentEntity = StudentEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'students' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], StudentEntity);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AttachmentEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const student_entity_1 = __webpack_require__(17);
const course_entity_1 = __webpack_require__(19);
let AttachmentEntity = class AttachmentEntity {
    constructor(aggregate) {
        if (aggregate) {
            const parsedEntity = JSON.parse(JSON.stringify(aggregate));
            Object.assign(this, parsedEntity);
        }
    }
};
exports.AttachmentEntity = AttachmentEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    tslib_1.__metadata("design:type", Number)
], AttachmentEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'media_type', nullable: true }),
    tslib_1.__metadata("design:type", String)
], AttachmentEntity.prototype, "mediaType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'file_name', nullable: true }),
    tslib_1.__metadata("design:type", String)
], AttachmentEntity.prototype, "fileName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'name', nullable: true }),
    tslib_1.__metadata("design:type", String)
], AttachmentEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'extension', nullable: true }),
    tslib_1.__metadata("design:type", String)
], AttachmentEntity.prototype, "extension", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'document_type', nullable: true }),
    tslib_1.__metadata("design:type", String)
], AttachmentEntity.prototype, "documentType", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AttachmentEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'updated_at',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AttachmentEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.StudentEntity, (course) => course.attachments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Array)
], AttachmentEntity.prototype, "students", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => course_entity_1.CourseEntity, (course) => course.attachments, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Array)
], AttachmentEntity.prototype, "courses", void 0);
exports.AttachmentEntity = AttachmentEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'attachments' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AttachmentEntity);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const core_orm_entity_1 = __webpack_require__(13);
const student_entity_1 = __webpack_require__(17);
const contract_entity_1 = __webpack_require__(20);
const attachment_entity_1 = __webpack_require__(18);
let CourseEntity = class CourseEntity extends core_orm_entity_1.CoreORMEntity {
    constructor(aggregate) {
        super();
        if (aggregate) {
            const parsedEntity = JSON.parse(JSON.stringify(aggregate));
            Object.assign(this, parsedEntity);
            if (parsedEntity.attachments) {
                this.attachments = parsedEntity.attachments.map((attachment) => new attachment_entity_1.AttachmentEntity(attachment));
            }
            if (parsedEntity.contract) {
                this.contract = new contract_entity_1.ContractEntity(parsedEntity.contract);
            }
        }
    }
};
exports.CourseEntity = CourseEntity;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'name' }),
    tslib_1.__metadata("design:type", String)
], CourseEntity.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'description', nullable: true }),
    tslib_1.__metadata("design:type", String)
], CourseEntity.prototype, "description", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.StudentEntity, (student) => student.courses, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Array)
], CourseEntity.prototype, "students", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => contract_entity_1.ContractEntity, (contract) => contract.course, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof contract_entity_1.ContractEntity !== "undefined" && contract_entity_1.ContractEntity) === "function" ? _a : Object)
], CourseEntity.prototype, "contract", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => attachment_entity_1.AttachmentEntity, (attachment) => attachment.courses, {
        cascade: true,
    }),
    (0, typeorm_1.JoinTable)({
        name: 'attachment_courses',
        joinColumn: { name: 'course_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'attachment_id', referencedColumnName: 'id' },
    }),
    tslib_1.__metadata("design:type", Array)
], CourseEntity.prototype, "attachments", void 0);
exports.CourseEntity = CourseEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'courses' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], CourseEntity);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const core_orm_entity_1 = __webpack_require__(13);
const course_entity_1 = __webpack_require__(19);
let ContractEntity = class ContractEntity extends core_orm_entity_1.CoreORMEntity {
    constructor(aggregate) {
        super();
        if (aggregate) {
            const parsedEntity = JSON.parse(JSON.stringify(aggregate));
            Object.assign(this, parsedEntity);
            if (parsedEntity.course) {
                this.course = new course_entity_1.CourseEntity(parsedEntity.course);
            }
        }
    }
};
exports.ContractEntity = ContractEntity;
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'student_name' }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "studentsNanme", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'school_name' }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "schoolName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'date_birth_student' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ContractEntity.prototype, "dateBirthStudent", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'curp', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "curp", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'student_phone' }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "studentPhone", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'scholarship' }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "scholarship", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', name: 'start_date_service' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ContractEntity.prototype, "startDateService", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'modality' }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "modality", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'annual_registration' }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "annualRegistration", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'payment_annual_id', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "paymentAnnualId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'json', name: 'monthly_payments' }),
    tslib_1.__metadata("design:type", Array)
], ContractEntity.prototype, "monthlyPayments", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'document_id', nullable: true }),
    tslib_1.__metadata("design:type", String)
], ContractEntity.prototype, "documentId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'signature', default: false }),
    tslib_1.__metadata("design:type", Boolean)
], ContractEntity.prototype, "signature", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'actived_contract', default: false }),
    tslib_1.__metadata("design:type", Boolean)
], ContractEntity.prototype, "activatedContract", void 0);
tslib_1.__decorate([
    (0, typeorm_1.OneToOne)(() => course_entity_1.CourseEntity, (course) => course.contract, {
        cascade: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'course_id' }),
    tslib_1.__metadata("design:type", typeof (_c = typeof course_entity_1.CourseEntity !== "undefined" && course_entity_1.CourseEntity) === "function" ? _c : Object)
], ContractEntity.prototype, "course", void 0);
exports.ContractEntity = ContractEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'contracts' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], ContractEntity);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const student_entity_1 = __webpack_require__(17);
let AddressEntity = class AddressEntity {
    constructor(aggregate) {
        if (aggregate) {
            const parsedEntity = JSON.parse(JSON.stringify(aggregate));
            Object.assign(this, parsedEntity);
        }
    }
};
exports.AddressEntity = AddressEntity;
tslib_1.__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    tslib_1.__metadata("design:type", Number)
], AddressEntity.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'zip_code' }),
    tslib_1.__metadata("design:type", Number)
], AddressEntity.prototype, "zipCode", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'city' }),
    tslib_1.__metadata("design:type", String)
], AddressEntity.prototype, "city", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'country' }),
    tslib_1.__metadata("design:type", String)
], AddressEntity.prototype, "country", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'state' }),
    tslib_1.__metadata("design:type", String)
], AddressEntity.prototype, "state", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', name: 'street_name' }),
    tslib_1.__metadata("design:type", String)
], AddressEntity.prototype, "streetName", void 0);
tslib_1.__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: 'timestamp',
        name: 'created_at',
        default: () => 'CURRENT_TIMESTAMP',
    }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], AddressEntity.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: 'timestamp',
        name: 'updated_at',
        nullable: true,
    }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], AddressEntity.prototype, "updatedAt", void 0);
tslib_1.__decorate([
    (0, typeorm_1.ManyToMany)(() => student_entity_1.StudentEntity, (student) => student.addresses, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    }),
    tslib_1.__metadata("design:type", Array)
], AddressEntity.prototype, "students", void 0);
exports.AddressEntity = AddressEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'addresses' }),
    tslib_1.__metadata("design:paramtypes", [Object])
], AddressEntity);


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userRepository = void 0;
const user_repository_1 = __webpack_require__(23);
const inject_tokens_1 = __webpack_require__(43);
exports.userRepository = {
    provide: inject_tokens_1.USER_REPOSITORY,
    useClass: user_repository_1.UserRepository,
};


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const typeorm_1 = __webpack_require__(11);
const base_repository_1 = __webpack_require__(24);
const user_1 = __webpack_require__(27);
const user_entity_1 = __webpack_require__(10);
const user_not_found_exception_1 = __webpack_require__(41);
const exception_keys_enum_1 = __webpack_require__(42);
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(user_1.User, dataSource);
        this.dataSource = dataSource;
        this.aliasName = 'user';
        this.entityPrefix = 'USR';
    }
    async findByEmail(email) {
        const entity = await this.manager
            .createQueryBuilder(user_entity_1.UserEntity, this.aliasName)
            .where(`${this.aliasName}.email = :email`, { email })
            .getOne();
        return entity && user_1.User.hydrate(entity);
    }
    async findByEmailOrFail(email) {
        const entity = await this.findByEmail(email);
        if (entity === undefined) {
            throw new user_not_found_exception_1.UserNotFoundException(exception_keys_enum_1.UserErrorKeys.USER_NOT_FOUND);
        }
        return entity;
    }
    async persist(entity) {
        const ormEntity = new user_entity_1.UserEntity(entity);
        ormEntity.updatedAt = new Date();
        await this.manager.save(ormEntity);
        return entity;
    }
    async findById(id) {
        const entity = await this.manager
            .createQueryBuilder(user_entity_1.UserEntity, this.aliasName)
            .leftJoinAndSelect(`${this.aliasName}.students`, 'students')
            .leftJoinAndSelect('students.courses', 'courses')
            .leftJoinAndSelect('students.addresses', 'addresses')
            .leftJoinAndSelect('courses.contract', 'contract')
            .leftJoinAndSelect(`${this.aliasName}.tokens`, 'tokens')
            .where(`${this.aliasName}.id = :id`, { id: id })
            .getOne();
        return entity && user_1.User.hydrate(entity);
    }
    async softDeleteUser(id) {
        const entity = await this.manager
            .createQueryBuilder(user_entity_1.UserEntity, this.aliasName)
            .softDelete()
            .where(`id = :id`, { id })
            .execute();
        if (entity.affected > 0) {
            return true;
        }
        return false;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UserRepository);


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseRepository = void 0;
const KSUID = __webpack_require__(25);
const identifier_1 = __webpack_require__(26);
const typeorm_1 = __webpack_require__(11);
class BaseRepository extends typeorm_1.Repository {
    constructor(target, dataSource) {
        super(target, dataSource.createEntityManager());
    }
    nextId() {
        return new identifier_1.Identifier(`${this.entityPrefix}_${KSUID.randomSync().string}`);
    }
    nextIdPrefix(prefix) {
        return new identifier_1.Identifier(`${prefix ? prefix : this.entityPrefix}_${KSUID.randomSync().string}`);
    }
}
exports.BaseRepository = BaseRepository;


/***/ }),
/* 25 */
/***/ ((module) => {

module.exports = require("ksuid");

/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Identifier = void 0;
class Identifier {
    constructor(value) {
        this.value = value;
        this.value = value;
    }
    equals(id) {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }
    toString() {
        return String(this.value);
    }
    toValue() {
        return this.value;
    }
}
exports.Identifier = Identifier;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const aggregate_root_1 = __webpack_require__(28);
const identifier_1 = __webpack_require__(26);
const student_1 = __webpack_require__(31);
class User extends aggregate_root_1.AggregateRoot {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            name: this._name,
            email: this._email,
            password: this._password,
            students: (this._students || []).map((student) => student.toJSON()),
            createdAt: this._createdAt,
        };
    }
    transformResponse() {
        return {
            id: this.id.toString(),
            name: this._name,
            email: this._email,
            students: (this._students || []).map((student) => student.toJSON()),
            createdAt: this._createdAt,
        };
    }
    get password() {
        return this._password;
    }
    static create(payload) {
        const user = new User(payload.id);
        user._name = payload.name;
        user._email = payload.email;
        user._password = payload.password;
        return user;
    }
    static hydrate(root) {
        const user = new User(new identifier_1.Identifier(root.id));
        user._name = root.name;
        user._email = root.email;
        user._password = root.password;
        user._students = (root.students || []).map((student) => student_1.Student.hydrate(student));
        return user;
    }
}
exports.User = User;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AggregateRoot = void 0;
const domain_entity_1 = __webpack_require__(29);
const domain_events_handler_1 = __webpack_require__(30);
class AggregateRoot extends domain_entity_1.Entity {
    constructor() {
        super(...arguments);
        this._domainEvents = [];
    }
    get id() {
        return this._id;
    }
    get domainEvents() {
        return this._domainEvents;
    }
    addDomainEvent(domainEvent) {
        this._domainEvents.push(domainEvent);
        domain_events_handler_1.DomainEvents.markAggregateForDispatch(this);
        this.logDomainEventAdded(domainEvent);
    }
    clearEvents() {
        this._domainEvents.splice(0, this._domainEvents.length);
    }
    logDomainEventAdded(domainEvent) {
        const thisClass = Reflect.getPrototypeOf(this);
        const domainEventClass = Reflect.getPrototypeOf(domainEvent);
        console.info(`[Domain Event Created]:`, thisClass.constructor.name, '==>', domainEventClass.constructor.name);
    }
}
exports.AggregateRoot = AggregateRoot;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Entity = void 0;
const isEntity = (v) => {
    return v instanceof Entity;
};
class Entity {
    constructor(id) {
        this._id = id;
        this._createdAt = new Date();
        this._updatedAt = null;
    }
    get id() {
        return this._id;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    equals(object) {
        if (object == null || object == undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!isEntity(object)) {
            return false;
        }
        return this._id.equals(object._id);
    }
    plain() {
        return { createdAt: this.createdAt, updatedAt: this.updatedAt };
    }
}
exports.Entity = Entity;


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainEvents = void 0;
class DomainEvents {
    static markAggregateForDispatch(aggregate) {
        const aggregateFound = !!this.findMarkedAggregateByID(aggregate.id);
        if (!aggregateFound) {
            this.markedAggregates.push(aggregate);
        }
    }
    static dispatchAggregateEvents(aggregate) {
        aggregate.domainEvents.forEach((event) => this.dispatch(event));
    }
    static removeAggregateFromMarkedDispatchList(aggregate) {
        const index = this.markedAggregates.findIndex((a) => a.equals(aggregate));
        this.markedAggregates.splice(index, 1);
    }
    static findMarkedAggregateByID(id) {
        let found = null;
        for (const aggregate of this.markedAggregates) {
            if (aggregate.id.equals(id)) {
                found = aggregate;
            }
        }
        return found;
    }
    static dispatchEventsForAggregate(id) {
        const aggregate = this.findMarkedAggregateByID(id);
        if (aggregate) {
            this.dispatchAggregateEvents(aggregate);
            aggregate.clearEvents();
            this.removeAggregateFromMarkedDispatchList(aggregate);
        }
    }
    static register(callback, eventClassName) {
        if (!Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
            this.handlersMap[eventClassName] = [];
        }
        this.handlersMap[eventClassName].push(callback);
    }
    static clearHandlers() {
        this.handlersMap = {};
    }
    static clearMarkedAggregates() {
        this.markedAggregates = [];
    }
    static dispatch(event) {
        const eventClassName = event.constructor.name;
        if (Object.prototype.hasOwnProperty.call(this.handlersMap, eventClassName)) {
            const handlers = this.handlersMap[eventClassName];
            for (const handler of handlers) {
                handler(event);
            }
        }
    }
}
exports.DomainEvents = DomainEvents;
DomainEvents.handlersMap = {};
DomainEvents.markedAggregates = [];


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Student = void 0;
const aggregate_root_1 = __webpack_require__(28);
const email_1 = __webpack_require__(32);
const identifier_1 = __webpack_require__(26);
const address_1 = __webpack_require__(37);
const course_1 = __webpack_require__(38);
class Student extends aggregate_root_1.AggregateRoot {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            fullName: this._fullName,
            email: this._email.toValue(),
            gender: this._gender,
            birthDate: this._birthDate && this._birthDate,
            curp: this._curp && this._curp,
            lastDegreeStudy: this._lastDegreeStudy,
            phone: this._phone && this._phone,
            addresses: this._addresses && this._addresses.map((add) => add.toJSON()),
            courses: this._courses && this._courses.map((course) => course.toJSON()),
            nationality: this._nationality,
            younger: this._younger,
            fatherFullName: this._fatherFullName && this._fatherFullName,
            studyModality: this._studyModality,
            createdAt: this._createdAt,
        };
    }
    static hydrate(root) {
        const student = new Student(new identifier_1.Identifier(root.id));
        student._addresses =
            root.addresses && root.addresses.map((add) => address_1.Address.hydrate(add));
        student._curp = root.curp;
        student._email = new email_1.Email({ email: root.email });
        student._fatherFullName = root.fatherFullName && root.fatherFullName;
        student._fullName = root.fullName;
        student._gender = root.gender;
        student._lastDegreeStudy = root.lastDegreeStudy;
        student._nationality = root.nationality;
        student._phone = root.phone && root.phone;
        student._younger = root.younger;
        student._birthDate = root.birthDate;
        student._studyModality = root.studyModality;
        student._courses =
            root.courses && root.courses.map((course) => course_1.Course.hydrate(course));
        return student;
    }
}
exports.Student = Student;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Email = void 0;
const exception_keys_enum_1 = __webpack_require__(33);
const invalid_email_exception_1 = __webpack_require__(34);
const value_object_1 = __webpack_require__(36);
class Email extends value_object_1.ValueObject {
    constructor(props) {
        super(props);
        const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!expression.test(props.email)) {
            throw new invalid_email_exception_1.InvalidEmailException(exception_keys_enum_1.CoreErrorKeys.INVALID_EMAIL);
        }
    }
    toValue() {
        return this._props.email;
    }
    toJSON() {
        return {
            email: this._props.email,
        };
    }
    address() {
        return this._props.email.split('@')[0];
    }
    domain() {
        return this._props.email.split('@')[1];
    }
}
exports.Email = Email;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreErrorKeys = void 0;
var CoreErrorKeys;
(function (CoreErrorKeys) {
    CoreErrorKeys["INVALID_EMAIL"] = "core.invalid_email";
    CoreErrorKeys["INVALID_PASSWORD"] = "core.invalid_password";
})(CoreErrorKeys || (exports.CoreErrorKeys = CoreErrorKeys = {}));


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidEmailException = void 0;
const domain_exception_1 = __webpack_require__(35);
class InvalidEmailException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
    }
}
exports.InvalidEmailException = InvalidEmailException;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    accept(visitor) {
        return visitor.visitDomainException(this);
    }
}
exports.DomainException = DomainException;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueObject = void 0;
class ValueObject {
    constructor(props) {
        this._props = Object.freeze(props);
    }
    equals(vo) {
        if (vo === null || vo === undefined) {
            return false;
        }
        if (vo.toValue() === undefined) {
            return false;
        }
        return this.toValue() === vo.toValue();
    }
}
exports.ValueObject = ValueObject;


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Address = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
class Address extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id && Number(this.id.toString()),
            city: this._city,
            country: this._country,
            streetName: this._streetName,
            createdAt: this._createdAt,
            state: this._state,
            zipCode: this._zipCode,
        };
    }
    static hydrate(root) {
        const address = new Address(new identifier_1.Identifier(root.id));
        address._city = root.city;
        address._country = root.country;
        address._state = root.state;
        address._zipCode = root.zipCode;
        address._streetName = root.streetName;
        address._createdAt = root.createdAt;
        return address;
    }
}
exports.Address = Address;


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Course = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
const attachment_1 = __webpack_require__(39);
const contract_1 = __webpack_require__(40);
class Course extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            name: this._name,
            description: this._description,
            contract: this._contract && this._contract.toJSON(),
            attachments: this._attachments && this._attachments.map((att) => att.toJSON()),
            createdAt: this._createdAt,
        };
    }
    static hydrate(root) {
        const course = new Course(new identifier_1.Identifier(root.id));
        course._name = root.name;
        course._description = root.description;
        course._createdAt = root.createdAt;
        course._contract = root.contract && contract_1.Contract.hydrate(root.contract);
        course._attachments =
            root.attachments &&
                root.attachments.map((att) => attachment_1.Attachment.hydrate(att));
        return course;
    }
}
exports.Course = Course;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Attachment = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
class Attachment extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toValue() && Number(this.id.toString()),
            mediaType: this._mediaType,
            fileName: this._fileName,
            name: this._name,
            extension: this._extension,
            documentType: this._documentType && this._documentType,
            createdAt: this._createdAt,
        };
    }
    static hydrate(root) {
        const document = new Attachment(new identifier_1.Identifier(root.id));
        document._mediaType = root.mediaType;
        document._fileName = root.fileName;
        document._name = root.name;
        document._extension = root.extension;
        document._documentType = root.documentType && root.documentType;
        document._createdAt = root.createdAt;
        return document;
    }
}
exports.Attachment = Attachment;


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contract = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
const course_1 = __webpack_require__(38);
class Contract extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
        this.MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    }
    toJSON() {
        return {
            id: this.id.toString(),
            annualRegistration: this._annualRegistration,
            curp: this._curp && this._curp,
            dateBirthStudent: this._dateBirthStudent,
            modality: this._modality,
            activatedContract: this._activatedContract,
            monthlyPayments: this._monthlyPayments,
            scholarship: this._scholarship,
            schoolName: this._schoolName,
            startDateService: this._startDateService,
            studentPhone: this._studentPhone,
            studentsNanme: this._studentsNanme,
            course: this._course && this._course.toJSON(),
            documentId: this._documentId && this._documentId,
            signature: this._signature && this._signature,
            createdAt: this._createdAt,
        };
    }
    static hydrate(root) {
        const contract = new Contract(new identifier_1.Identifier(root.id));
        contract._annualRegistration = root.annualRegistration;
        contract._curp = root.curp && root.curp;
        contract._dateBirthStudent = root.dateBirthStudent;
        contract._activatedContract = root.activatedContract;
        contract._modality = root.modality;
        contract._monthlyPayments = root.monthlyPayments;
        contract._scholarship = root.scholarship;
        contract._schoolName = root.schoolName;
        contract._startDateService = root.startDateService;
        contract._studentPhone = root.studentPhone;
        contract._studentsNanme = root.studentsNanme;
        contract._documentId = root.documentId && root.documentId;
        contract._signature = root.signature && root.signature;
        contract._course = root.course && course_1.Course.hydrate(root.course);
        return contract;
    }
}
exports.Contract = Contract;


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserNotFoundException = void 0;
const domain_exception_1 = __webpack_require__(35);
class UserNotFoundException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = UserNotFoundException.name;
    }
}
exports.UserNotFoundException = UserNotFoundException;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserErrorKeys = void 0;
var UserErrorKeys;
(function (UserErrorKeys) {
    UserErrorKeys["UNAUTHORIZED"] = "users.unauthorized";
    UserErrorKeys["USER_NOT_FOUND"] = "users.user_not_found";
    UserErrorKeys["USER_EXIST"] = "users.user_already_exists";
    UserErrorKeys["USER_ROLE_EXIST"] = "user.role_already_exists";
    UserErrorKeys["USER_EMAIL_EXIST"] = "user.email_already_exists";
    UserErrorKeys["USER_NOT_ACTIVE"] = "user.not_active";
})(UserErrorKeys || (exports.UserErrorKeys = UserErrorKeys = {}));


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USER_REPOSITORY = void 0;
exports.USER_REPOSITORY = Symbol('USER_REPOSITORY');


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreModule = void 0;
const tslib_1 = __webpack_require__(1);
const config_1 = __webpack_require__(4);
const common_1 = __webpack_require__(2);
const path = tslib_1.__importStar(__webpack_require__(45));
const typeorm_1 = __webpack_require__(9);
const mailer_1 = __webpack_require__(46);
const config_module_1 = __webpack_require__(47);
const database_loader_1 = __webpack_require__(48);
const config_loader_1 = __webpack_require__(49);
const user_entity_1 = __webpack_require__(12);
const token_entity_1 = __webpack_require__(14);
const custom_providers_1 = __webpack_require__(50);
const student_entity_1 = __webpack_require__(17);
const contract_entity_1 = __webpack_require__(20);
const attachment_entity_1 = __webpack_require__(18);
const course_entity_1 = __webpack_require__(19);
const address_entity_1 = __webpack_require__(21);
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = tslib_1.__decorate([
    (0, common_1.Module)({
        exports: [custom_providers_1.hasher, custom_providers_1.mailProviderService, custom_providers_1.signNowService, custom_providers_1.awsService],
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.ConfigModule.forFeature(database_loader_1.databaseConfigLoader)],
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const config = configService.get('database');
                    return {
                        type: config.type,
                        host: config.host,
                        port: config.port,
                        username: config.username,
                        password: config.password,
                        database: config.database,
                        logging: config.logging,
                        synchronize: config.synchronize,
                        autoLoadEntities: config.autoLoadEntities,
                        migrationsTableName: config.migrationsTableName,
                        migrations: [process.cwd() + config.migrationsPath],
                        migrationsRun: config.runMigrations,
                        keepConnectionAlive: true,
                        entities: [
                            user_entity_1.UserEntity,
                            token_entity_1.TokenEntity,
                            student_entity_1.StudentEntity,
                            contract_entity_1.ContractEntity,
                            attachment_entity_1.AttachmentEntity,
                            course_entity_1.CourseEntity,
                            address_entity_1.AddressEntity,
                        ],
                        cli: {
                            migrationsDir: 'database/migration',
                        },
                    };
                },
            }),
            config_module_1.ConfigModule.forRoot({
                envFilePath: path.join(__dirname.replace(/\/dist/, ''), '.env'),
                isGlobal: true,
                load: [config_loader_1.configLoader],
            }),
            mailer_1.MailerModule.forRootAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (configService) => {
                    const transport = configService.get('transport');
                    console.log(transport);
                    return {
                        transport,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            custom_providers_1.hasher,
            custom_providers_1.transformInterceptor,
            custom_providers_1.exceptionFilter,
            custom_providers_1.exceptionMapper,
            custom_providers_1.mailProviderService,
            custom_providers_1.signNowService,
            custom_providers_1.awsService,
        ],
    })
], CoreModule);


/***/ }),
/* 45 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 46 */
/***/ ((module) => {

module.exports = require("@nestjs-modules/mailer");

/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var ConfigModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
let ConfigModule = ConfigModule_1 = class ConfigModule {
    static forFeature(config) {
        return {
            imports: [config_1.ConfigModule.forFeature(config)],
            module: ConfigModule_1,
            providers: [config_1.ConfigService],
            exports: [config_1.ConfigService],
        };
    }
    static forRoot(options) {
        return {
            imports: [config_1.ConfigModule.forRoot(options)],
            module: ConfigModule_1,
            providers: [config_1.ConfigService],
            exports: [config_1.ConfigService],
        };
    }
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = ConfigModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], ConfigModule);


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.databaseConfigLoader = void 0;
const config_1 = __webpack_require__(4);
const config_loader_1 = __webpack_require__(49);
exports.databaseConfigLoader = (0, config_1.registerAs)('database', () => (0, config_loader_1.configLoader)().database);


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configLoader = void 0;
const configLoader = () => ({
    server: {
        port: parseInt(process.env.PORT, 10),
        applicationName: process.env.APP_NAME,
    },
    database: {
        type: process.env.MAIN_DB_TYPE,
        host: process.env.MAIN_DB_HOST,
        port: parseInt(process.env.MAIN_DB_PORT, 10),
        username: process.env.MAIN_DB_USERNAME,
        password: process.env.MAIN_DB_PASSWORD,
        database: process.env.MAIN_DB_NAME,
        logging: process.env.MAIN_DB_LOGGING === '1',
        synchronize: process.env.MAIN_DB_SYNC === '1',
        autoLoadEntities: true,
        migrationsTableName: 'migrations',
        migrationsPath: process.env.MIGRATIONS_PATH,
        runMigrations: process.env.MAIN_DB_RUN_MIGRATIONS === '1',
    },
    application: {
        secret: process.env.AUTH_SECRET,
        expiration: parseInt(process.env.AUTH_EXPIRATION, 10),
        refreshSecret: process.env.REFRESH_SECRET,
        refreshExpiration: parseInt(process.env.REFRESH_EXPIRATION, 10),
        redactedKeys: process.env.REDACTED_KEYS,
    },
    transport: {
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT, 10),
    },
    signNow: {
        baseUrl: process.env.BASE_URL_SIGNNOW,
        userName: process.env.SIGNNOW_USER_NAME,
        password: process.env.SIGNNOW_PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SERCRET_KEY,
        documentId: process.env.SIGN_NOW_DOCUMENT_ID,
    },
    aws: {
        accessKey: process.env.ACCESS_KEY,
        bucketName: process.env.BUCKET,
        secretKey: process.env.SECRET_KEY,
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY,
        endpointSecret: process.env.STRIPE_ENDPOINT_SECRET,
    },
});
exports.configLoader = configLoader;


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.awsService = exports.signNowService = exports.mailProviderService = exports.exceptionMapper = exports.exceptionFilter = exports.transformInterceptor = exports.hasher = void 0;
const core_1 = __webpack_require__(3);
const hash_encryptor_1 = __webpack_require__(51);
const inject_tokens_1 = __webpack_require__(53);
const transform_interceptor_1 = __webpack_require__(54);
const core_exception_filter_1 = __webpack_require__(56);
const exception_http_mapper_1 = __webpack_require__(58);
const mail_provider_service_1 = __webpack_require__(67);
const signnow_service_1 = __webpack_require__(68);
const aws_service_1 = __webpack_require__(70);
exports.hasher = { provide: inject_tokens_1.HASHER, useClass: hash_encryptor_1.HashEncryptor };
exports.transformInterceptor = {
    provide: core_1.APP_INTERCEPTOR,
    useClass: transform_interceptor_1.TransformInterceptor,
};
exports.exceptionFilter = {
    provide: core_1.APP_FILTER,
    useClass: core_exception_filter_1.CoreExceptionFilter,
};
exports.exceptionMapper = {
    provide: inject_tokens_1.EXCEPTION_MAPPER,
    useClass: exception_http_mapper_1.ExceptionHttpMapper,
};
exports.mailProviderService = {
    provide: inject_tokens_1.MAIL_PROVIDER_SERVICE,
    useClass: mail_provider_service_1.MailProviderService,
};
exports.signNowService = {
    provide: inject_tokens_1.SIGN_NOW_SERVICE,
    useClass: signnow_service_1.SignNowService,
};
exports.awsService = {
    provide: inject_tokens_1.AWS_SERVICE,
    useClass: aws_service_1.AwsService,
};


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HashEncryptor = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const bcrypt = tslib_1.__importStar(__webpack_require__(52));
let HashEncryptor = class HashEncryptor {
    constructor() {
        this.saltOrRounds = 10;
    }
    async encrypt(dataToEncrypt) {
        return bcrypt.hash(dataToEncrypt, this.saltOrRounds);
    }
    async compare(plainData, hashedData) {
        return bcrypt.compare(plainData, hashedData);
    }
};
exports.HashEncryptor = HashEncryptor;
exports.HashEncryptor = HashEncryptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], HashEncryptor);


/***/ }),
/* 52 */
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AWS_SERVICE = exports.SIGN_NOW_SERVICE = exports.MAIL_PROVIDER_SERVICE = exports.EXCEPTION_MAPPER = exports.HASHER = void 0;
exports.HASHER = Symbol('HASHER');
exports.EXCEPTION_MAPPER = Symbol('EXCEPTION_MAPPER');
exports.MAIL_PROVIDER_SERVICE = Symbol('MAIL_PROVIDER_SERVICE');
exports.SIGN_NOW_SERVICE = Symbol('SIGN_NOW_SERVICE');
exports.AWS_SERVICE = Symbol('AWS_SERVICE');


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const operators_1 = __webpack_require__(55);
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            const response = context.switchToHttp().getResponse();
            if (data === undefined) {
                response.status(204);
                return;
            }
            else if (data === null) {
                response.status(404);
                return;
            }
            else if (JSON.stringify(data) === '{}') {
                response.status(204);
                return;
            }
            if (data.data && data.metadata) {
                return {
                    metadata: data.metadata.plain(),
                    data: data.data,
                    statusCode: context.switchToHttp().getResponse().statusCode,
                };
            }
            return {
                data: data.entities ? data.entities : data,
                metadata: data.metadata ? data.metadata : undefined,
                statusCode: context.switchToHttp().getResponse().statusCode,
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = tslib_1.__decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);


/***/ }),
/* 55 */
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CoreExceptionFilter = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const exception_mapper_1 = __webpack_require__(57);
const inject_tokens_1 = __webpack_require__(53);
let CoreExceptionFilter = class CoreExceptionFilter {
    constructor(mapper) {
        this.mapper = mapper;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const httpException = this.mapper.map(exception);
        if (exception instanceof common_1.BadRequestException) {
            response.status(exception.getStatus()).json(exception.getResponse());
        }
        else {
            response.status(httpException.statusCode).json(httpException);
        }
    }
};
exports.CoreExceptionFilter = CoreExceptionFilter;
exports.CoreExceptionFilter = CoreExceptionFilter = tslib_1.__decorate([
    (0, common_1.Catch)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.EXCEPTION_MAPPER)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof exception_mapper_1.IExceptionMapper !== "undefined" && exception_mapper_1.IExceptionMapper) === "function" ? _a : Object])
], CoreExceptionFilter);


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExceptionHttpMapper = void 0;
const common_1 = __webpack_require__(2);
const auth_errors_constant_1 = __webpack_require__(59);
const core_exceptions_1 = __webpack_require__(61);
const users_errors_constant_1 = __webpack_require__(62);
const tokens_errors_constant_1 = __webpack_require__(63);
const student_errors_1 = __webpack_require__(65);
class ExceptionHttpMapper {
    map(exception) {
        const errorsCatalog = {
            ...auth_errors_constant_1.AUTH_ERRORS,
            ...core_exceptions_1.CORE_ERRORS,
            ...users_errors_constant_1.USER_ERRORS,
            ...tokens_errors_constant_1.TOKENS_ERRORS,
            ...student_errors_1.STUDENT_ERRORS,
        };
        const defaultHttpInternalServerError = {
            error: exception.message,
            message: 'Internal Server Error',
            httpStatusCode: exception.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR,
        };
        const httpErrorDefinition = exception.message in errorsCatalog
            ? errorsCatalog[exception.message]
            : defaultHttpInternalServerError;
        return {
            statusCode: httpErrorDefinition.httpStatusCode,
            error: exception.message,
            message: httpErrorDefinition.message,
            timestamp: new Date().toISOString(),
        };
    }
}
exports.ExceptionHttpMapper = ExceptionHttpMapper;


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AUTH_ERRORS = void 0;
const exception_keys_enum_1 = __webpack_require__(60);
exports.AUTH_ERRORS = {
    [exception_keys_enum_1.AuthErrorKeys.EXPIRED_TOKEN]: {
        message: 'The token has expired',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.AuthErrorKeys.INVALID_SIGNATURE]: {
        message: 'The token signature is invalid',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.AuthErrorKeys.MALFORMED_TOKEN]: {
        message: 'Malformed Token',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.AuthErrorKeys.UNAUTHORIZED]: {
        message: 'Unauthorized',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.AuthErrorKeys.REVOKED_TOKEN]: {
        message: 'The token has been revoked',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.AuthErrorKeys.INVALID_OTP]: {
        message: 'Invalid OTP',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.AuthErrorKeys.EXPIRED_OTP]: {
        message: 'Expired OTP',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.AuthErrorKeys.FORBIDDEN_RESOURCE]: {
        message: "You can't have the required role to access this resource",
        httpStatusCode: 403,
    },
    [exception_keys_enum_1.AuthErrorKeys.NO_OTP_SESSION]: {
        message: "You don't have an OTP session active",
        httpStatusCode: 404,
    },
    [exception_keys_enum_1.AuthErrorKeys.DISABLED_OTP]: {
        message: 'This feature is disabled',
        httpStatusCode: 403,
    },
};


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthErrorKeys = void 0;
var AuthErrorKeys;
(function (AuthErrorKeys) {
    AuthErrorKeys["UNAUTHORIZED"] = "auth.unauthorized";
    AuthErrorKeys["FORBIDDEN_RESOURCE"] = "auth.forbidden_resource";
    AuthErrorKeys["EXPIRED_TOKEN"] = "auth.expired_token";
    AuthErrorKeys["INVALID_SIGNATURE"] = "auth.invalid_signature";
    AuthErrorKeys["REVOKED_TOKEN"] = "auth.revoked_token";
    AuthErrorKeys["MALFORMED_TOKEN"] = "auth.malformed_token";
    AuthErrorKeys["INVALID_OTP"] = "auth.invalid_otp";
    AuthErrorKeys["NO_OTP_SESSION"] = "auth.otp_session_not_found";
    AuthErrorKeys["EXPIRED_OTP"] = "auth.expired_otp";
    AuthErrorKeys["DISABLED_OTP"] = "auth.disabled_otp";
})(AuthErrorKeys || (exports.AuthErrorKeys = AuthErrorKeys = {}));


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CORE_ERRORS = void 0;
const exception_keys_enum_1 = __webpack_require__(33);
exports.CORE_ERRORS = {
    [exception_keys_enum_1.CoreErrorKeys.INVALID_EMAIL]: {
        message: 'Invalid Email',
        httpStatusCode: 409,
    },
};


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.USER_ERRORS = void 0;
const exception_keys_enum_1 = __webpack_require__(42);
exports.USER_ERRORS = {
    [exception_keys_enum_1.UserErrorKeys.UNAUTHORIZED]: {
        message: 'Unauthorized',
        httpStatusCode: 401,
    },
    [exception_keys_enum_1.UserErrorKeys.USER_NOT_FOUND]: {
        message: 'User not found',
        httpStatusCode: 404,
    },
    [exception_keys_enum_1.UserErrorKeys.USER_EXIST]: {
        message: 'User already exists',
        httpStatusCode: 409,
    },
    [exception_keys_enum_1.UserErrorKeys.USER_ROLE_EXIST]: {
        message: 'User has role assigned',
        httpStatusCode: 409,
    },
    [exception_keys_enum_1.UserErrorKeys.USER_EMAIL_EXIST]: {
        message: 'Email used by another user',
        httpStatusCode: 409,
    },
    [exception_keys_enum_1.UserErrorKeys.USER_NOT_ACTIVE]: {
        message: 'User Not Active',
        httpStatusCode: 401,
    },
};


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TOKENS_ERRORS = void 0;
const exception_keys_enum_1 = __webpack_require__(64);
exports.TOKENS_ERRORS = {
    [exception_keys_enum_1.TokensErrorKeys.USER_NOT_FOUND]: {
        message: 'User not found',
        httpStatusCode: 404,
    },
};


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokensErrorKeys = void 0;
var TokensErrorKeys;
(function (TokensErrorKeys) {
    TokensErrorKeys["USER_NOT_FOUND"] = "token.user_not_found";
})(TokensErrorKeys || (exports.TokensErrorKeys = TokensErrorKeys = {}));


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.STUDENT_ERRORS = void 0;
const student_errors_enum_1 = __webpack_require__(66);
exports.STUDENT_ERRORS = {
    [student_errors_enum_1.StudentErrors.STUDENT_ALREADY_EXISTS]: {
        message: 'student already exists',
        httpStatusCode: 400,
    },
    [student_errors_enum_1.StudentErrors.CONTRACT_AMOUNT_ERROR]: {
        message: 'Contract annual amount is incorrect',
        httpStatusCode: 400,
    },
    [student_errors_enum_1.StudentErrors.CONTRACT_AMOUNT_GREATER_THAN]: {
        message: 'The Amount is greater than in the contract',
        httpStatusCode: 400,
    },
    [student_errors_enum_1.ContractErrors.CONTRACT_SIGNATURE_ALREADY_EXIST]: {
        message: 'The Contract already has a signature',
        httpStatusCode: 400,
    },
    [student_errors_enum_1.StudentErrors.STUDENT_FILE_ERROR]: {
        message: 'Invalid type file',
        httpStatusCode: 413,
    },
    [student_errors_enum_1.ContractErrors.CONTRACT_ACTIVED_EXIST]: {
        message: 'Has activated contract',
        httpStatusCode: 400,
    },
    [student_errors_enum_1.ContractErrors.CONTRACT_NOT_ACTIVATED]: {
        message: 'Does not have an activated contract',
        httpStatusCode: 400,
    },
    [student_errors_enum_1.CourseErrors.COURSE_NOT_FOUND]: {
        message: 'Course not found in the student profile',
        httpStatusCode: 404,
    },
};


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseErrors = exports.ContractErrors = exports.StudentErrors = void 0;
var StudentErrors;
(function (StudentErrors) {
    StudentErrors["STUDENT_ALREADY_EXISTS"] = "student-already-exists";
    StudentErrors["CONTRACT_AMOUNT_ERROR"] = "contract-amount-invalid";
    StudentErrors["CONTRACT_AMOUNT_GREATER_THAN"] = "amount-is-greater-than-in-contract";
    StudentErrors["STUDENT_FILE_ERROR"] = "file.type-invalid";
})(StudentErrors || (exports.StudentErrors = StudentErrors = {}));
var ContractErrors;
(function (ContractErrors) {
    ContractErrors["CONTRACT_SIGNATURE_ALREADY_EXIST"] = "contract.signature-already-exists";
    ContractErrors["CONTRACT_ACTIVED_EXIST"] = "contract.actived-exist";
    ContractErrors["CONTRACT_NOT_ACTIVATED"] = "contract.not-activated";
})(ContractErrors || (exports.ContractErrors = ContractErrors = {}));
var CourseErrors;
(function (CourseErrors) {
    CourseErrors["COURSE_NOT_FOUND"] = "course.not-found";
})(CourseErrors || (exports.CourseErrors = CourseErrors = {}));


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MailProviderService = void 0;
const tslib_1 = __webpack_require__(1);
const mailer_1 = __webpack_require__(46);
const common_1 = __webpack_require__(2);
let MailProviderService = class MailProviderService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendStudentConfirmation(email) {
        try {
            await this.mailerService.sendMail({
                from: '"No Reply" <noreply@example.com>', // sender address
                to: email, // list of receivers
                subject: 'Inscripción de estudiante', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>', // html body
            });
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.MailProviderService = MailProviderService;
exports.MailProviderService = MailProviderService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mailer_1.MailerService !== "undefined" && mailer_1.MailerService) === "function" ? _a : Object])
], MailProviderService);


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignNowService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const axios_1 = tslib_1.__importDefault(__webpack_require__(69));
let SignNowService = class SignNowService {
    constructor(config) {
        this.config = config;
        this.apiBaseUrl = this.config.get('signNow').baseUrl;
    }
    async getAccessToken() {
        const url = `${this.apiBaseUrl}/oauth2/token`;
        const { clientId, clientSecret, password, userName } = this.config.get('signNow');
        const data = {
            grant_type: 'password',
            username: userName,
            password,
            client_id: clientId,
            client_secret: clientSecret,
        };
        try {
            const response = await axios_1.default.post(url, data, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${data.client_id}:${data.client_secret}`).toString('base64')}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.access_token;
        }
        catch (error) {
            throw new Error(`Failed to get access token: ${error.message}`);
        }
    }
    async prefillDocumentFields(documentId, fields) {
        const templateId = await this.createTemplate(documentId);
        const url = `${this.apiBaseUrl}/document/${templateId}`;
        const payload = this.payloadContract(fields);
        try {
            const response = await axios_1.default.put(url, payload, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to prefill document fields: ${error.message}`);
        }
    }
    async getUrlDocument(documentId) {
        try {
            const url = `${this.apiBaseUrl}/document/${documentId}/download/link`;
            const response = await axios_1.default.post(url, null, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.link;
        }
        catch (error) {
            throw new Error(`Failed to getting document: ${error.message}`);
        }
    }
    async signDocument(documentId) {
        try {
            const url = `${this.apiBaseUrl}/link/`;
            const fields = { document_id: documentId };
            const response = await axios_1.default.post(url, fields, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        }
        catch (error) {
            console.log(error);
            throw new Error(`Failed to getting document: ${error.message}`);
        }
    }
    async createTemplate(documentId) {
        const payload = {
            document_name: 'Contracto Ifashion',
            document_id: documentId,
        };
        const url = `${this.apiBaseUrl}/template`;
        try {
            const response = await axios_1.default.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.id;
        }
        catch (error) {
            throw new Error(`Failed to prefill document fields: ${error.message}`);
        }
    }
    payloadContract(fields) {
        const { fullName, schoolName, dateBirthStudent, curp, address, phone, scholarship, startDateService, modality, createdAt, } = fields;
        const payload = {
            document_name: 'contrato de la especialidad de diseño de modas',
            texts: [
                {
                    page_number: 0,
                    data: fullName,
                    x: 86,
                    y: 297,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 0,
                    data: schoolName,
                    x: 86,
                    y: 314,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 1,
                    data: dateBirthStudent,
                    x: 255,
                    y: 155,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 1,
                    data: curp,
                    x: 82,
                    y: 170,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 1,
                    data: address,
                    x: 348,
                    y: 170,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 1,
                    data: phone,
                    x: 203,
                    y: 185,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 1,
                    data: scholarship,
                    x: 277,
                    y: 202,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 1,
                    data: startDateService,
                    x: 121,
                    y: 316,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 1,
                    data: modality,
                    x: 269,
                    y: 316,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 17,
                    data: createdAt,
                    x: 233,
                    y: 590,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
                {
                    page_number: 17,
                    data: fullName,
                    x: 257,
                    y: 654,
                    font: 'Arial',
                    line_height: 12,
                    size: 10,
                },
            ],
        };
        return payload;
    }
    async sendInviteSignature(documentId, data) {
        const documentIdByTemplate = await this.getCopyTemplate(documentId);
        const url = `${this.apiBaseUrl}/document/${documentIdByTemplate}/invite`;
        const payload = this.payloadSendInviteToSignature(documentIdByTemplate, data);
        try {
            const response = await axios_1.default.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return { ...response.data, documentIdByTemplate };
        }
        catch (error) {
            console.log(error.data);
            throw new Error(`Failed to send invite signature: ${error.message}`);
        }
    }
    payloadSendInviteToSignature(documentId, data) {
        const { userName } = this.config.get('signNow');
        const payload = {
            cc: [],
            document_id: documentId,
            from: userName,
            message: `${userName} te invitó a firmar "contrato de la especialidad de diseño de modas"`,
            on_complete: 'document_and_attachments',
            subject: 'contrato de la especialidad de diseño de modas: Solicitud de firma de fco.mendoza',
            to: [
                {
                    role: 'Destinatario 2',
                    order: 1,
                    message: `${userName} te invitó a firmar "contrato de la especialidad de diseño de modas"`,
                    subject: 'contrato de la especialidad de diseño de modas: Solicitud de firma de fco.mendoza',
                    email: data.email,
                    role_id: data.roleId,
                    expiration_days: 30,
                    reminder: {
                        remind_before: 0,
                        remind_after: 0,
                        remind_repeat: 0,
                    },
                    authentication: {
                        type: null,
                    },
                    reassign: '0',
                    decline_by_signature: '0',
                },
            ],
            cc_step: [],
            document_name: 'contrato de la especialidad de diseño de modas',
            client_timestamp: 1722273409,
            template: true,
            viewers: [
                {
                    message: `${userName} te invitó a firmar "contrato de la especialidad de diseño de modas"`,
                    subject: 'contrato de la especialidad de diseño de modas: Solicitud de firma de fco.mendoza',
                    email: `${userName}`,
                    role: 'You',
                    order: 2,
                },
            ],
        };
        return payload;
    }
    async getRoleIdByDocumentId(documentId) {
        try {
            const url = `${this.apiBaseUrl}/document/${documentId}`;
            const response = await axios_1.default.get(url, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.routing_details[0].data[0].role_id;
        }
        catch (error) {
            throw new Error(`Failed to getting document: ${error.message}`);
        }
    }
    async getDocumentById(documentId) {
        try {
            const url = `${this.apiBaseUrl}/document/${documentId}`;
            const response = await axios_1.default.get(url, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        }
        catch (error) {
            throw new Error(`Failed to getting document: ${error.message}`);
        }
    }
    async getCopyTemplate(templateId) {
        const url = `${this.apiBaseUrl}/template/${templateId}/copy`;
        const payload = {
            document_name: 'Document-contract-ifashion',
        };
        try {
            const response = await axios_1.default.post(url, payload, {
                headers: {
                    Authorization: `Bearer ${this.accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data.id;
        }
        catch (error) {
            console.log(error.data);
            throw new Error(`Failed to send: ${error.message}`);
        }
    }
    async onModuleInit() {
        this.accessToken = await this.getAccessToken();
    }
};
exports.SignNowService = SignNowService;
exports.SignNowService = SignNowService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], SignNowService);


/***/ }),
/* 69 */
/***/ ((module) => {

module.exports = require("axios");

/***/ }),
/* 70 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AwsService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const client_s3_1 = __webpack_require__(71);
const s3_request_presigner_1 = __webpack_require__(72);
const config_1 = __webpack_require__(4);
let AwsService = class AwsService {
    constructor(config) {
        this.config = config;
        const { accessKey, bucketName, secretKey } = this.config.get('aws');
        this.bucket = bucketName;
        this.connection = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: accessKey,
                secretAccessKey: secretKey,
            },
        });
    }
    async putFile(key, body) {
        const uploadFile = new client_s3_1.PutObjectCommand({
            Bucket: this.bucket,
            Key: key,
            Body: body,
        });
        return this.connection.send(uploadFile);
    }
    async getUrl(key) {
        const command = new client_s3_1.GetObjectCommand({
            Bucket: this.bucket,
            Key: key,
        });
        return (0, s3_request_presigner_1.getSignedUrl)(this.connection, command);
    }
};
exports.AwsService = AwsService;
exports.AwsService = AwsService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AwsService);


/***/ }),
/* 71 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-s3");

/***/ }),
/* 72 */
/***/ ((module) => {

module.exports = require("@aws-sdk/s3-request-presigner");

/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CheckUserAllowed = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(43);
const user_repository_1 = __webpack_require__(74);
const inject_tokens_2 = __webpack_require__(53);
const hasher_1 = __webpack_require__(75);
const exception_keys_enum_1 = __webpack_require__(42);
let CheckUserAllowed = class CheckUserAllowed {
    constructor(userRepository, hasher) {
        this.userRepository = userRepository;
        this.hasher = hasher;
    }
    async process(userDto) {
        const user = await this.userRepository.findByEmailOrFail(userDto.email);
        if (user && (await this.hasher.compare(userDto.password, user.password))) {
            return user;
        }
        throw new common_1.UnauthorizedException(exception_keys_enum_1.UserErrorKeys.UNAUTHORIZED);
    }
};
exports.CheckUserAllowed = CheckUserAllowed;
exports.CheckUserAllowed = CheckUserAllowed = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.USER_REPOSITORY)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_2.HASHER)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.IUserRepository !== "undefined" && user_repository_1.IUserRepository) === "function" ? _a : Object, typeof (_b = typeof hasher_1.IHasher !== "undefined" && hasher_1.IHasher) === "function" ? _b : Object])
], CheckUserAllowed);


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateUser = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(43);
const user_repository_1 = __webpack_require__(74);
const user_1 = __webpack_require__(27);
const user_exists_exception_1 = __webpack_require__(77);
const exception_keys_enum_1 = __webpack_require__(42);
const inject_tokens_2 = __webpack_require__(53);
const hasher_1 = __webpack_require__(75);
let CreateUser = class CreateUser {
    constructor(userRepository, hasher) {
        this.userRepository = userRepository;
        this.hasher = hasher;
    }
    async process(payload) {
        const { email, name, password } = payload;
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            throw new user_exists_exception_1.UserExistException(exception_keys_enum_1.UserErrorKeys.USER_EXIST);
        }
        const passwordEncrypt = await this.hasher.encrypt(password);
        const newUser = user_1.User.create({
            id: this.userRepository.nextId(),
            email,
            name,
            password: passwordEncrypt,
        });
        const userSave = await this.userRepository.persist(newUser);
        return userSave.transformResponse();
    }
};
exports.CreateUser = CreateUser;
exports.CreateUser = CreateUser = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.USER_REPOSITORY)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_2.HASHER)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.IUserRepository !== "undefined" && user_repository_1.IUserRepository) === "function" ? _a : Object, typeof (_b = typeof hasher_1.IHasher !== "undefined" && hasher_1.IHasher) === "function" ? _b : Object])
], CreateUser);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserExistException = void 0;
const domain_exception_1 = __webpack_require__(35);
class UserExistException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = UserExistException.name;
    }
}
exports.UserExistException = UserExistException;


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const create_user_1 = __webpack_require__(76);
const user_create_payload_dto_1 = __webpack_require__(79);
const swagger_1 = __webpack_require__(5);
const login_guard_1 = __webpack_require__(81);
const user_profile_1 = __webpack_require__(91);
let UserController = class UserController {
    constructor(createUser, userProfile) {
        this.createUser = createUser;
        this.userProfile = userProfile;
    }
    async create(payload) {
        return this.createUser.process(payload);
    }
    async getUserProfile(request) {
        const token = request.headers['authorization']?.replace(/Bearer\s/, '');
        return await this.userProfile.process(token);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, common_1.Post)('/signup'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof user_create_payload_dto_1.UserCreatePayloadDto !== "undefined" && user_create_payload_dto_1.UserCreatePayloadDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Get)('/me'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof Request !== "undefined" && Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getUserProfile", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_user_1.CreateUser !== "undefined" && create_user_1.CreateUser) === "function" ? _a : Object, typeof (_b = typeof user_profile_1.UserProfile !== "undefined" && user_profile_1.UserProfile) === "function" ? _b : Object])
], UserController);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserCreatePayloadDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(80);
class UserCreatePayloadDto {
}
exports.UserCreatePayloadDto = UserCreatePayloadDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserCreatePayloadDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserCreatePayloadDto.prototype, "name", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserCreatePayloadDto.prototype, "password", void 0);


/***/ }),
/* 80 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginGuard = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(82);
const jwt_exception_mapper_1 = __webpack_require__(83);
const exception_keys_enum_1 = __webpack_require__(60);
const unauthorized_exception_1 = __webpack_require__(87);
const validate_token_1 = __webpack_require__(88);
let LoginGuard = class LoginGuard {
    constructor(jwtService, jwtExceptionMapper, validateTypeToken) {
        this.jwtService = jwtService;
        this.jwtExceptionMapper = jwtExceptionMapper;
        this.validateTypeToken = validateTypeToken;
    }
    async canActivate(context) {
        try {
            const request = context.switchToHttp().getRequest();
            const pathRequest = request.url;
            const token = request.headers['authorization']?.replace(/Bearer\s/, '');
            const tokenData = await this.jwtService.verify(token);
            // if (pathRequest === '/api/auth/update-password') {
            //   const { user: userValidate, tokenActive } =
            //     await this.validateTypeToken.process({
            //       email: tokenData.user.email,
            //       typeToken: TokenTypes.RECOVERY_PASSWORD,
            //     });
            //   if (tokenActive !== token) {
            //     throw new UnauthorizedException(AuthErrorKeys.UNAUTHORIZED);
            //   }
            //   request.user = userValidate;
            //   return true;
            // }
            if (!tokenData) {
                throw new unauthorized_exception_1.UnauthorizedException(exception_keys_enum_1.AuthErrorKeys.UNAUTHORIZED);
            }
            request.user = tokenData.user;
            return true;
        }
        catch (error) {
            throw this.jwtExceptionMapper.map(error);
        }
    }
};
exports.LoginGuard = LoginGuard;
exports.LoginGuard = LoginGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof jwt_exception_mapper_1.JwtExceptionMapper !== "undefined" && jwt_exception_mapper_1.JwtExceptionMapper) === "function" ? _b : Object, typeof (_c = typeof validate_token_1.ValidateTypeToken !== "undefined" && validate_token_1.ValidateTypeToken) === "function" ? _c : Object])
], LoginGuard);


/***/ }),
/* 82 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtExceptionMapper = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const exception_keys_enum_1 = __webpack_require__(60);
const expired_token_exception_1 = __webpack_require__(84);
const invalid_signature_exception_1 = __webpack_require__(85);
const malformed_token_exception_1 = __webpack_require__(86);
const unauthorized_exception_1 = __webpack_require__(87);
let JwtExceptionMapper = class JwtExceptionMapper {
    map(error) {
        if (error.message === 'jwt expired') {
            return new expired_token_exception_1.ExpiredTokenException(exception_keys_enum_1.AuthErrorKeys.EXPIRED_TOKEN);
        }
        if (error.message === 'invalid signature') {
            return new invalid_signature_exception_1.InvalidSignatureException(exception_keys_enum_1.AuthErrorKeys.INVALID_SIGNATURE);
        }
        if (error.message === 'jwt must be provided') {
            return new unauthorized_exception_1.UnauthorizedException(exception_keys_enum_1.AuthErrorKeys.UNAUTHORIZED);
        }
        if (error.message === 'jwt malformed' ||
            error.message === 'invalid token' ||
            error.message.includes('in JSON')) {
            return new malformed_token_exception_1.MalformedTokenException(exception_keys_enum_1.AuthErrorKeys.MALFORMED_TOKEN);
        }
        return error;
    }
};
exports.JwtExceptionMapper = JwtExceptionMapper;
exports.JwtExceptionMapper = JwtExceptionMapper = tslib_1.__decorate([
    (0, common_1.Injectable)()
], JwtExceptionMapper);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExpiredTokenException = void 0;
const domain_exception_1 = __webpack_require__(35);
class ExpiredTokenException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = ExpiredTokenException.name;
    }
}
exports.ExpiredTokenException = ExpiredTokenException;


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidSignatureException = void 0;
const domain_exception_1 = __webpack_require__(35);
class InvalidSignatureException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = InvalidSignatureException.name;
    }
}
exports.InvalidSignatureException = InvalidSignatureException;


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MalformedTokenException = void 0;
const domain_exception_1 = __webpack_require__(35);
class MalformedTokenException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = MalformedTokenException.name;
    }
}
exports.MalformedTokenException = MalformedTokenException;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UnauthorizedException = void 0;
const domain_exception_1 = __webpack_require__(35);
class UnauthorizedException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = UnauthorizedException.name;
    }
}
exports.UnauthorizedException = UnauthorizedException;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValidateTypeToken = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(89);
const user_repository_interface_1 = __webpack_require__(90);
let ValidateTypeToken = class ValidateTypeToken {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async process(command) {
        const { email, typeToken } = command;
        const user = await this.userRepository.findByEmail(email);
        const tokenActive = user.getActiveToken(typeToken);
        return {
            user: user.removeTokens().toJSON(),
            tokenActive: tokenActive.toJSON().value,
        };
    }
};
exports.ValidateTypeToken = ValidateTypeToken;
exports.ValidateTypeToken = ValidateTypeToken = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.USER_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_interface_1.IUserRepository !== "undefined" && user_repository_interface_1.IUserRepository) === "function" ? _a : Object])
], ValidateTypeToken);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GENERATE_TOKEN = exports.USER_REPOSITORY = void 0;
exports.USER_REPOSITORY = Symbol('USER_REPOSITORY');
exports.GENERATE_TOKEN = Symbol('GENERATE_TOKEN');


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserProfile = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(82);
const inject_tokens_1 = __webpack_require__(43);
const user_repository_1 = __webpack_require__(74);
let UserProfile = class UserProfile {
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async process(command) {
        const tokenData = await this.jwtService.verify(command);
        const user = await this.userRepository.findById(tokenData.user.id);
        return user.transformResponse();
    }
};
exports.UserProfile = UserProfile;
exports.UserProfile = UserProfile = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_1.USER_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof user_repository_1.IUserRepository !== "undefined" && user_repository_1.IUserRepository) === "function" ? _b : Object])
], UserProfile);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_exception_mapper_1 = __webpack_require__(83);
const typeorm_1 = __webpack_require__(9);
const user_entity_1 = __webpack_require__(93);
const custom_providers_1 = __webpack_require__(94);
const token_module_1 = __webpack_require__(100);
const jwt_1 = __webpack_require__(82);
const config_module_1 = __webpack_require__(47);
const config_1 = __webpack_require__(4);
const user_module_1 = __webpack_require__(8);
const login_1 = __webpack_require__(108);
const associate_user_tokens_1 = __webpack_require__(109);
const auth_controller_1 = __webpack_require__(110);
const login_guard_1 = __webpack_require__(81);
const validate_token_1 = __webpack_require__(88);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        exports: [jwt_exception_mapper_1.JwtExceptionMapper, jwt_1.JwtModule, validate_token_1.ValidateTypeToken, login_guard_1.LoginGuard],
        imports: [
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity]),
            token_module_1.TokenModule,
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (config) => ({
                    secret: config.get('application').secret,
                    signOptions: { expiresIn: config.get('application').expiration },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            associate_user_tokens_1.AssociateUserTokens,
            jwt_exception_mapper_1.JwtExceptionMapper,
            custom_providers_1.userRepository,
            login_1.Login,
            login_guard_1.LoginGuard,
            validate_token_1.ValidateTypeToken,
        ],
    })
], AuthModule);


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__(1);
const typeorm_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(12);
let UserEntity = class UserEntity extends user_entity_1.UserEntity {
};
exports.UserEntity = UserEntity;
exports.UserEntity = UserEntity = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.userRepository = void 0;
const user_repository_1 = __webpack_require__(95);
const inject_tokens_1 = __webpack_require__(89);
exports.userRepository = {
    provide: inject_tokens_1.USER_REPOSITORY,
    useClass: user_repository_1.UserRepository,
};


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_1 = __webpack_require__(96);
const base_repository_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(93);
const user_not_found_exception_1 = __webpack_require__(98);
const user_exception_keys_enum_1 = __webpack_require__(99);
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(user_1.User, dataSource);
        this.dataSource = dataSource;
        this.aliasName = 'user';
    }
    async persist(entity) {
        const ormEntity = new user_entity_1.UserEntity(entity);
        ormEntity.updatedAt = new Date();
        await this.manager.save(ormEntity);
        return entity;
    }
    async findById(id) {
        const entity = await this.manager
            .createQueryBuilder(user_entity_1.UserEntity, 'user')
            .where('user.id = :id', { id })
            .getOne();
        return entity && user_1.User.hydrate(entity);
    }
    async findByEmail(email) {
        const entity = await this.manager
            .createQueryBuilder(user_entity_1.UserEntity, this.aliasName)
            .where(`LOWER(${this.aliasName}.email) = :email`, { email })
            .leftJoinAndSelect(`${this.aliasName}.tokens`, 'tokens')
            .getOne();
        return entity && user_1.User.hydrate(entity);
    }
    async findByEmailOrFail(email) {
        const entity = await this.findByEmail(email);
        if (entity === undefined) {
            throw new user_not_found_exception_1.UserNotFoundException(user_exception_keys_enum_1.UserErrorKeys.USER_NOT_FOUND);
        }
        return entity;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UserRepository);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const domain_entity_1 = __webpack_require__(29);
const token_1 = __webpack_require__(97);
const token_types_enum_1 = __webpack_require__(15);
const identifier_1 = __webpack_require__(26);
const exception_keys_enum_1 = __webpack_require__(60);
const invalid_signature_exception_1 = __webpack_require__(85);
class User extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            name: this._name,
            email: this._email,
            tokens: (this._tokens || []).map((token) => token.toJSON()),
            createdAt: this._createdAt,
        };
    }
    getActiveToken(type) {
        const token = this._tokens.find((token) => token.isAlive(type));
        if (!token) {
            if (type === token_types_enum_1.TokenTypes.RECOVERY_PASSWORD) {
                throw new invalid_signature_exception_1.InvalidSignatureException(exception_keys_enum_1.AuthErrorKeys.INVALID_SIGNATURE);
            }
        }
        return token;
    }
    removeTokens() {
        this._tokens = [];
        return this;
    }
    addRefreshToken(token) {
        this.revokeAllActiveTokens();
        this._tokens.push(token);
        return token;
    }
    revokeAllActiveTokens() {
        this._tokens.forEach((token) => token.revoke());
    }
    static hydrate(root) {
        const user = new User(new identifier_1.Identifier(root.id));
        user._name = root.name;
        user._email = root.email;
        user._password = root.password;
        user._tokens = (root.tokens || []).map((token) => token_1.Token.hydrate(token));
        return user;
    }
}
exports.User = User;


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Token = void 0;
const token_status_enum_1 = __webpack_require__(16);
class Token {
    constructor() { }
    static create(tokenValue, type, ttl) {
        const token = new Token();
        token._token = tokenValue;
        token._type = type;
        token._createdAt = new Date();
        const expiration = new Date();
        expiration.setMinutes(expiration.getMinutes() + ttl / 60);
        token._expires = expiration;
        token._status = token_status_enum_1.TokenStatus.ACTIVE;
        return token;
    }
    static hydrate(root) {
        const token = new Token();
        token._id = root.id;
        token._token = root.token;
        token._type = root.type;
        token._status = root.status;
        token._expires = root.expiration;
        token._createdAt = root.createdAt;
        token._updatedAt = root.updatedAt;
        return token;
    }
    toJSON() {
        return {
            id: this._id,
            value: this._token,
            status: this._status,
            type: this._type,
            expiration: this._expires,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
        };
    }
    get id() {
        return this._id;
    }
    get value() {
        return this._token;
    }
    get ttl() {
        return (this._expires.getTime() - this._createdAt.getTime()) / 1000;
    }
    revoke() {
        if (this._status === token_status_enum_1.TokenStatus.ACTIVE) {
            this._status = token_status_enum_1.TokenStatus.REVOKED;
            this._updatedAt = new Date();
        }
    }
    expire() {
        if (this._status === token_status_enum_1.TokenStatus.ACTIVE) {
            this._status = token_status_enum_1.TokenStatus.EXPIRED;
            this._updatedAt = new Date();
        }
    }
    isExpired() {
        return new Date() >= this._expires && this._status === token_status_enum_1.TokenStatus.ACTIVE;
    }
    isAlive(type) {
        return (this._type === type &&
            this._status === token_status_enum_1.TokenStatus.ACTIVE &&
            this._expires > new Date());
    }
}
exports.Token = Token;


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserNotFoundException = void 0;
const domain_exception_1 = __webpack_require__(35);
class UserNotFoundException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = UserNotFoundException.name;
    }
}
exports.UserNotFoundException = UserNotFoundException;


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserErrorKeys = void 0;
var UserErrorKeys;
(function (UserErrorKeys) {
    UserErrorKeys["UNAUTHORIZED"] = "users.unauthorized";
    UserErrorKeys["USER_NOT_FOUND"] = "users.user_not_found";
    UserErrorKeys["USER_EXIST"] = "users.user_already_exists";
})(UserErrorKeys || (exports.UserErrorKeys = UserErrorKeys = {}));


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const custom_providers_1 = __webpack_require__(101);
const generate_token_1 = __webpack_require__(106);
const session_token_1 = __webpack_require__(103);
const core_module_1 = __webpack_require__(44);
const jwt_1 = __webpack_require__(82);
const config_module_1 = __webpack_require__(47);
const config_1 = __webpack_require__(4);
const refresh_token_1 = __webpack_require__(104);
let TokenModule = class TokenModule {
};
exports.TokenModule = TokenModule;
exports.TokenModule = TokenModule = tslib_1.__decorate([
    (0, common_1.Module)({
        exports: [generate_token_1.GenerateToken, custom_providers_1.tokenGenerateFactory],
        imports: [
            core_module_1.CoreModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_module_1.ConfigModule],
                useFactory: async (config) => ({
                    secret: config.get('application').secret,
                    signOptions: { expiresIn: config.get('application').expiration },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            custom_providers_1.tokenGenerateFactory,
            generate_token_1.GenerateToken,
            session_token_1.SessionTokenGenerator,
            refresh_token_1.RefreshTokenGenerator,
        ],
    })
], TokenModule);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.tokenGenerateFactory = void 0;
const token_generator_factory_1 = __webpack_require__(102);
const inject_tokens_1 = __webpack_require__(105);
exports.tokenGenerateFactory = {
    provide: inject_tokens_1.TOKEN_GENERATE_FACTORY,
    useClass: token_generator_factory_1.TokenGeneratorFactory,
};


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TokenGeneratorFactory = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const token_types_enum_1 = __webpack_require__(15);
const session_token_1 = __webpack_require__(103);
const refresh_token_1 = __webpack_require__(104);
let TokenGeneratorFactory = class TokenGeneratorFactory {
    constructor(session, refresh) {
        this.session = session;
        this.refresh = refresh;
        this.strategies = new Map();
        this.strategies.set(token_types_enum_1.TokenTypes.SESSION, this.session);
        this.strategies.set(token_types_enum_1.TokenTypes.REFRESH, this.refresh);
    }
    createTokenGenerator(tokenType) {
        this.assertThatTypeIsValid(tokenType);
        return this.strategies.get(tokenType);
    }
    assertThatTypeIsValid(tokenType) {
        if (!this.strategies.has(tokenType)) {
            throw new Error('');
        }
    }
};
exports.TokenGeneratorFactory = TokenGeneratorFactory;
exports.TokenGeneratorFactory = TokenGeneratorFactory = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof session_token_1.SessionTokenGenerator !== "undefined" && session_token_1.SessionTokenGenerator) === "function" ? _a : Object, typeof (_b = typeof refresh_token_1.RefreshTokenGenerator !== "undefined" && refresh_token_1.RefreshTokenGenerator) === "function" ? _b : Object])
], TokenGeneratorFactory);


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SessionTokenGenerator = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(82);
const config_1 = __webpack_require__(4);
const token_1 = __webpack_require__(97);
const token_types_enum_1 = __webpack_require__(15);
let SessionTokenGenerator = class SessionTokenGenerator {
    constructor(jwtService, config) {
        this.jwtService = jwtService;
        this.config = config;
    }
    generate(user) {
        const { id, email, name } = user;
        const payload = {
            user: {
                id,
                email,
                name,
            },
        };
        return token_1.Token.create(this.jwtService.sign(payload), token_types_enum_1.TokenTypes.SESSION, this.config.get('application').expiration);
    }
};
exports.SessionTokenGenerator = SessionTokenGenerator;
exports.SessionTokenGenerator = SessionTokenGenerator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], SessionTokenGenerator);


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RefreshTokenGenerator = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_1 = __webpack_require__(82);
const config_1 = __webpack_require__(4);
const token_1 = __webpack_require__(97);
const token_types_enum_1 = __webpack_require__(15);
let RefreshTokenGenerator = class RefreshTokenGenerator {
    constructor(jwtService, config) {
        this.jwtService = jwtService;
        this.config = config;
    }
    generate(user) {
        const { id } = user;
        return token_1.Token.create(this.jwtService.sign({ id }, {
            secret: this.config.get('application').refreshSecret,
            expiresIn: this.config.get('application').refreshExpiration,
        }), token_types_enum_1.TokenTypes.REFRESH, this.config.get('application').refreshExpiration);
    }
};
exports.RefreshTokenGenerator = RefreshTokenGenerator;
exports.RefreshTokenGenerator = RefreshTokenGenerator = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object])
], RefreshTokenGenerator);


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TOKEN_GENERATE_FACTORY = void 0;
exports.TOKEN_GENERATE_FACTORY = Symbol('TOKEN_GENERATE_FACTORY');


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateTokenDto = exports.GenerateToken = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const token_factory_1 = __webpack_require__(107);
const inject_tokens_1 = __webpack_require__(105);
let GenerateToken = class GenerateToken {
    constructor(tokenGeneratorFactory) {
        this.tokenGeneratorFactory = tokenGeneratorFactory;
    }
    async process(command) {
        const tokenStrategy = this.tokenGeneratorFactory.createTokenGenerator(command.tokenType);
        return tokenStrategy.generate(command.user);
    }
};
exports.GenerateToken = GenerateToken;
exports.GenerateToken = GenerateToken = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.TOKEN_GENERATE_FACTORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof token_factory_1.ITokenFactory !== "undefined" && token_factory_1.ITokenFactory) === "function" ? _a : Object])
], GenerateToken);
class GenerateTokenDto {
}
exports.GenerateTokenDto = GenerateTokenDto;


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Login = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_repository_interface_1 = __webpack_require__(90);
const associate_user_tokens_1 = __webpack_require__(109);
const inject_tokens_1 = __webpack_require__(89);
const check_user_allowed_1 = __webpack_require__(73);
let Login = class Login {
    constructor(userRepository, associateUserTokens, checkUserAllowed) {
        this.userRepository = userRepository;
        this.associateUserTokens = associateUserTokens;
        this.checkUserAllowed = checkUserAllowed;
    }
    async process(command) {
        const user = await this.userRepository.findByEmail(command.email);
        await this.checkUserAllowed.process(command);
        return this.associateUserTokens.process(user);
    }
};
exports.Login = Login;
exports.Login = Login = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.USER_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_interface_1.IUserRepository !== "undefined" && user_repository_interface_1.IUserRepository) === "function" ? _a : Object, typeof (_b = typeof associate_user_tokens_1.AssociateUserTokens !== "undefined" && associate_user_tokens_1.AssociateUserTokens) === "function" ? _b : Object, typeof (_c = typeof check_user_allowed_1.CheckUserAllowed !== "undefined" && check_user_allowed_1.CheckUserAllowed) === "function" ? _c : Object])
], Login);


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssociateUserTokens = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const token_types_enum_1 = __webpack_require__(15);
const user_repository_interface_1 = __webpack_require__(90);
const inject_tokens_1 = __webpack_require__(89);
const generate_token_1 = __webpack_require__(106);
let AssociateUserTokens = class AssociateUserTokens {
    constructor(userRepository, generateToken) {
        this.userRepository = userRepository;
        this.generateToken = generateToken;
    }
    async process(user) {
        const accessToken = await this.generateToken.process({
            user: user.toJSON(),
            tokenType: token_types_enum_1.TokenTypes.SESSION,
        });
        const refreshToken = await this.generateToken.process({
            user: user.toJSON(),
            tokenType: token_types_enum_1.TokenTypes.REFRESH,
        });
        user.addRefreshToken(refreshToken);
        await this.userRepository.persist(user);
        return {
            userId: user.id.toString(),
            accessToken: accessToken.value,
            refreshToken: refreshToken.value,
        };
    }
};
exports.AssociateUserTokens = AssociateUserTokens;
exports.AssociateUserTokens = AssociateUserTokens = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.USER_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_repository_interface_1.IUserRepository !== "undefined" && user_repository_interface_1.IUserRepository) === "function" ? _a : Object, typeof (_b = typeof generate_token_1.GenerateToken !== "undefined" && generate_token_1.GenerateToken) === "function" ? _b : Object])
], AssociateUserTokens);


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const login_1 = __webpack_require__(108);
const auth_login_dto_1 = __webpack_require__(111);
const swagger_1 = __webpack_require__(5);
const auth_login_reponse_dto_1 = __webpack_require__(112);
let AuthController = class AuthController {
    constructor(login) {
        this.login = login;
    }
    async authLogin(payload) {
        return this.login.process(payload);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiResponse)({ type: auth_login_reponse_dto_1.UserLoginReponseDto }),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof auth_login_dto_1.AuthLoginDto !== "undefined" && auth_login_dto_1.AuthLoginDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "authLogin", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof login_1.Login !== "undefined" && login_1.Login) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthLoginDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(80);
class AuthLoginDto {
}
exports.AuthLoginDto = AuthLoginDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthLoginDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], AuthLoginDto.prototype, "password", void 0);


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserLoginReponseDto = exports.DataUser = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
class DataUser {
}
exports.DataUser = DataUser;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], DataUser.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], DataUser.prototype, "accessToken", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], DataUser.prototype, "refreshToken", void 0);
class UserLoginReponseDto {
}
exports.UserLoginReponseDto = UserLoginReponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: DataUser }),
    tslib_1.__metadata("design:type", DataUser)
], UserLoginReponseDto.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], UserLoginReponseDto.prototype, "statusCode", void 0);


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.options = void 0;
const config_schema_1 = __webpack_require__(114);
const server_loader_1 = __webpack_require__(116);
exports.options = {
    cache: true,
    isGlobal: true,
    load: [server_loader_1.serverConfigLoader],
    validationSchema: config_schema_1.configSchema,
    validationOptions: {
        allowUnknown: true,
        abortEarly: true,
    },
    envFilePath: ['.env', '.env.local', '.env.test'],
};


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configSchema = void 0;
const tslib_1 = __webpack_require__(1);
const Joi = tslib_1.__importStar(__webpack_require__(115));
exports.configSchema = Joi.object({
    APP_NAME: Joi.string().empty('').default('Application'),
    PORT: Joi.number().required(),
    MAIN_DB_TYPE: Joi.string().required(),
    MAIN_DB_HOST: Joi.string().required(),
    MAIN_DB_PORT: Joi.number().required(),
    MAIN_DB_USERNAME: Joi.string().required(),
    MAIN_DB_PASSWORD: Joi.string(),
    MAIN_DB_NAME: Joi.string().required(),
    MAIN_DB_LOGGING: Joi.number().required(),
    MAIN_DB_SYNC: Joi.number(),
    MAIN_DB_RUN_MIGRATIONS: Joi.number().required(),
    MIGRATIONS_PATH: Joi.string().required(),
    AUTH_SECRET: Joi.string().required(),
    AUTH_EXPIRATION: Joi.number().required(),
    REFRESH_SECRET: Joi.string().required(),
    REFRESH_EXPIRATION: Joi.number().required(),
    MAIL_HOST: Joi.string().required(),
    MAIL_PORT: Joi.number().required(),
    MAIL_USER: Joi.string().required(),
    MAIL_PASS: Joi.string().required(),
    REDACTED_KEYS: Joi.string().required(),
    BASE_URL_SIGNNOW: Joi.string().required(),
    SIGNNOW_USER_NAME: Joi.string().required(),
    SIGNNOW_PASSWORD: Joi.string().required(),
    CLIENT_ID: Joi.string().required(),
    CLIENT_SERCRET_KEY: Joi.string().required(),
    SIGN_NOW_DOCUMENT_ID: Joi.string().required(),
    BUCKET: Joi.string().required(),
    ACCESS_KEY: Joi.string().required(),
    SECRET_KEY: Joi.string().required(),
    STRIPE_SECRET_KEY: Joi.string().required(),
    STRIPE_ENDPOINT_SECRET: Joi.string().required(),
});


/***/ }),
/* 115 */
/***/ ((module) => {

module.exports = require("joi");

/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.serverConfigLoader = void 0;
const config_1 = __webpack_require__(4);
const config_loader_1 = __webpack_require__(49);
exports.serverConfigLoader = (0, config_1.registerAs)('server', () => (0, config_loader_1.configLoader)().server);


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_module_1 = __webpack_require__(44);
const platform_express_1 = __webpack_require__(118);
const custom_providers_1 = __webpack_require__(119);
const create_student_1 = __webpack_require__(132);
const student_controller_1 = __webpack_require__(138);
const auth_module_1 = __webpack_require__(92);
const create_contract_1 = __webpack_require__(144);
const annual_payment_1 = __webpack_require__(150);
const monthlyPayment_1 = __webpack_require__(152);
const contract_sign_now_1 = __webpack_require__(153);
const get_contract_by_id_1 = __webpack_require__(156);
const upload_file_student_1 = __webpack_require__(157);
const get_data_student_by_contract_id_1 = __webpack_require__(161);
const list_all_course_1 = __webpack_require__(162);
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [student_controller_1.StudentController],
        imports: [
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            platform_express_1.MulterModule.register({
                limits: {
                    fileSize: 5 * 1024 * 1024, // 5 MB
                },
                fileFilter: (_req, file, callback) => {
                    const allowedMimeTypes = ['application/pdf'];
                    if (allowedMimeTypes.includes(file.mimetype)) {
                        callback(null, true);
                    }
                    else {
                        callback(null, false);
                    }
                },
            }),
        ],
        providers: [
            custom_providers_1.studentRepository,
            create_student_1.CreateStudent,
            custom_providers_1.userRepository,
            custom_providers_1.contractRepository,
            create_contract_1.CreateContract,
            annual_payment_1.AnnualPayment,
            monthlyPayment_1.MonthlyPayment,
            contract_sign_now_1.ContractSignNow,
            get_contract_by_id_1.GetContractById,
            upload_file_student_1.UploadFileStudent,
            get_data_student_by_contract_id_1.GetDataStudentByContractId,
            custom_providers_1.courseRepository,
            list_all_course_1.ListAllCourse,
        ],
    })
], StudentModule);


/***/ }),
/* 118 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.courseRepository = exports.contractRepository = exports.userRepository = exports.studentRepository = void 0;
const contract_repository_1 = __webpack_require__(120);
const course_repository_1 = __webpack_require__(125);
const student_repository_1 = __webpack_require__(126);
const user_repository_1 = __webpack_require__(130);
const inject_tokens_1 = __webpack_require__(131);
exports.studentRepository = {
    provide: inject_tokens_1.STUDENT_REPOSITORY,
    useClass: student_repository_1.StudentRepository,
};
exports.userRepository = {
    provide: inject_tokens_1.USER_REPOSITORY,
    useClass: user_repository_1.UserRepository,
};
exports.contractRepository = {
    provide: inject_tokens_1.CONTRACT_REPOSITORY,
    useClass: contract_repository_1.ContractRepository,
};
exports.courseRepository = {
    provide: inject_tokens_1.COURSE_REPOSITORY,
    useClass: course_repository_1.CourseRepository,
};


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const contract_1 = __webpack_require__(121);
const base_repository_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(11);
const contract_entity_1 = __webpack_require__(20);
let ContractRepository = class ContractRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(contract_1.Contract, dataSource);
        this.dataSource = dataSource;
        this.aliasName = 'contract';
        this.entityPrefix = 'CON';
    }
    async findById(id) {
        const entity = await this.manager
            .createQueryBuilder(contract_entity_1.ContractEntity, this.aliasName)
            .where(`${this.aliasName}.id = :id`, { id })
            .getOne();
        return entity && contract_1.Contract.hydrate(entity);
    }
    async persist(entity) {
        const ormEntity = new contract_entity_1.ContractEntity(entity);
        ormEntity.updatedAt = new Date();
        await this.manager.save(ormEntity);
        return entity;
    }
};
exports.ContractRepository = ContractRepository;
exports.ContractRepository = ContractRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], ContractRepository);


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contract = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
const student_errors_enum_1 = __webpack_require__(66);
const invalid_amount_exception_1 = __webpack_require__(122);
const course_1 = __webpack_require__(123);
class Contract extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
        this.MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
    }
    toJSON() {
        return {
            id: this.id.toString(),
            annualRegistration: this._annualRegistration,
            payment_annual_id: this._payment_annual_id && this._payment_annual_id,
            curp: this._curp && this._curp,
            dateBirthStudent: this._dateBirthStudent,
            modality: this._modality,
            activatedContract: this._activatedContract,
            monthlyPayments: this._monthlyPayments,
            scholarship: this._scholarship,
            schoolName: this._schoolName,
            startDateService: this._startDateService,
            studentPhone: this._studentPhone,
            studentsNanme: this._studentsNanme,
            course: this._course && this._course.toJSON(),
            documentId: this._documentId && this._documentId,
            signature: this._signature && this._signature,
            createdAt: this._createdAt,
        };
    }
    assignDocumentId(documentId) {
        this._documentId = documentId;
    }
    assignSignature() {
        this._signature = true;
    }
    twentyPercentDiscount(annualPaymentDate, amount) {
        const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
        if (Number(this._annualRegistration) > amount) {
            throw new invalid_amount_exception_1.InvalidAmountException(student_errors_enum_1.StudentErrors.CONTRACT_AMOUNT_ERROR);
        }
        if (amount > Number(this._annualRegistration)) {
            throw new invalid_amount_exception_1.InvalidAmountException(student_errors_enum_1.StudentErrors.CONTRACT_AMOUNT_GREATER_THAN);
        }
        const daysDifference = Math.floor((annualPaymentDate.getTime() -
            new Date(this._startDateService).getTime()) /
            MILLISECONDS_IN_A_DAY);
        if (daysDifference <= 30) {
            const discount = (Number(this._annualRegistration) * 0.8).toString();
            this._annualRegistration = discount;
        }
    }
    thirtyPercentDiscount(monthluPaymentDate, amount) {
        const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;
        this._monthlyPayments = this._monthlyPayments.map((payment) => {
            if (Number(payment.amount) === amount) {
                const daysDifference = Math.floor((monthluPaymentDate.getTime() -
                    new Date(payment.paymentDate).getTime()) /
                    MILLISECONDS_IN_A_DAY);
                if (daysDifference <= 5) {
                    const calculateAmount = Number(payment.amount) * 0.7;
                    payment.amount = calculateAmount.toString();
                }
                if (daysDifference > 5) {
                    const laterDays = daysDifference - 5;
                    const daysFine = laterDays * 150;
                    const amountWithFine = Number(payment.amount) + daysFine;
                    payment.amount = amountWithFine.toString();
                }
            }
            return payment;
        });
    }
    static create(payload) {
        const contract = new Contract(payload.id);
        contract._annualRegistration = payload.annualRegistration;
        contract._curp = payload.curp;
        contract._dateBirthStudent = payload.dateBirthStudent;
        contract._activatedContract = payload.activatedContract;
        contract._modality = payload.modality;
        contract._monthlyPayments = payload.monthlyPayments;
        contract._scholarship = payload.scholarship;
        contract._schoolName = payload.schoolName;
        contract._startDateService = payload.startDateService;
        contract._studentPhone = payload.studentPhone;
        contract._studentsNanme = payload.studentsNanme;
        contract._course = payload.course;
        return contract;
    }
    static hydrate(root) {
        const contract = new Contract(new identifier_1.Identifier(root.id));
        contract._annualRegistration = root.annualRegistration;
        contract._payment_annual_id =
            root.payment_annual_id && root.payment_annual_id;
        contract._curp = root.curp && root.curp;
        contract._dateBirthStudent = root.dateBirthStudent;
        contract._activatedContract = root.activatedContract;
        contract._modality = root.modality;
        contract._monthlyPayments = root.monthlyPayments;
        contract._scholarship = root.scholarship;
        contract._schoolName = root.schoolName;
        contract._startDateService = root.startDateService;
        contract._studentPhone = root.studentPhone;
        contract._studentsNanme = root.studentsNanme;
        contract._documentId = root.documentId && root.documentId;
        contract._signature = root.signature && root.signature;
        contract._course = root.course && course_1.Course.hydrate(root.course);
        return contract;
    }
}
exports.Contract = Contract;


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidAmountException = void 0;
const domain_exception_1 = __webpack_require__(35);
class InvalidAmountException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = InvalidAmountException.name;
    }
}
exports.InvalidAmountException = InvalidAmountException;


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Course = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
const attachment_1 = __webpack_require__(124);
const contract_1 = __webpack_require__(121);
class Course extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            name: this._name,
            description: this._description,
            contract: this._contract && this._contract.toJSON(),
            attachments: this._attachments && this._attachments.map((att) => att.toJSON()),
            createdAt: this._createdAt,
        };
    }
    get contract() {
        return this.contract;
    }
    assignAttachment(attachments) {
        this._attachments = attachments;
    }
    static create(payload) {
        const course = new Course(payload.id);
        course._name = payload.name;
        course._description = payload.description;
        return course;
    }
    static hydrate(root) {
        const course = new Course(new identifier_1.Identifier(root.id));
        course._name = root.name;
        course._description = root.description;
        course._createdAt = root.createdAt;
        course._contract = root.contract && contract_1.Contract.hydrate(root.contract);
        course._attachments =
            root.attachments &&
                root.attachments.map((att) => attachment_1.Attachment.hydrate(att));
        return course;
    }
}
exports.Course = Course;


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Attachment = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
class Attachment extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toValue() && Number(this.id.toString()),
            mediaType: this._mediaType,
            fileName: this._fileName,
            name: this._name,
            extension: this._extension,
            documentType: this._documentType && this._documentType,
            createdAt: this._createdAt,
        };
    }
    static create(attachment) {
        const newDocument = new Attachment(new identifier_1.Identifier(attachment.id));
        newDocument._mediaType = attachment.mediaType;
        newDocument._fileName = attachment.fileName;
        newDocument._name = attachment.name;
        newDocument._extension = attachment.extension;
        newDocument._documentType = attachment.documentType;
        return newDocument;
    }
    static hydrate(root) {
        const document = new Attachment(new identifier_1.Identifier(root.id));
        document._mediaType = root.mediaType;
        document._fileName = root.fileName;
        document._name = root.name;
        document._extension = root.extension;
        document._documentType = root.documentType && root.documentType;
        document._createdAt = root.createdAt;
        return document;
    }
}
exports.Attachment = Attachment;


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const course_1 = __webpack_require__(123);
const base_repository_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(11);
const course_entity_1 = __webpack_require__(19);
let CourseRepository = class CourseRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(course_1.Course, dataSource);
        this.dataSource = dataSource;
        this.aliasName = 'course';
    }
    async findById(id) {
        const entity = await this.manager
            .createQueryBuilder(course_entity_1.CourseEntity, this.aliasName)
            .where(`${this.aliasName}.id = :id`, { id })
            .getOne();
        return entity && course_1.Course.hydrate(entity);
    }
    async findAllCourses() {
        const entities = await this.manager
            .createQueryBuilder(course_entity_1.CourseEntity, this.aliasName)
            .getMany();
        return entities && entities.map((entity) => course_1.Course.hydrate(entity));
    }
};
exports.CourseRepository = CourseRepository;
exports.CourseRepository = CourseRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], CourseRepository);


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const student_1 = __webpack_require__(127);
const base_repository_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(11);
const student_entity_1 = __webpack_require__(17);
let StudentRepository = class StudentRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(student_1.Student, dataSource);
        this.dataSource = dataSource;
        this.aliasName = 'student';
        this.entityPrefix = 'STD';
    }
    async persist(entity) {
        const ormEntity = new student_entity_1.StudentEntity(entity);
        ormEntity.updatedAt = new Date();
        await this.manager.save(ormEntity);
        return entity;
    }
    async findById(id) {
        const entity = await this.manager
            .createQueryBuilder(student_entity_1.StudentEntity, this.aliasName)
            .where(`${this.aliasName}.id = :id`, { id: id })
            .leftJoinAndSelect(`${this.aliasName}.courses`, 'courses')
            .leftJoinAndSelect(`${this.aliasName}.addresses`, 'addresses')
            .leftJoinAndSelect('courses.contract', 'contract')
            .getOne();
        return entity && student_1.Student.hydrate(entity);
    }
    async findByEmail(email) {
        const entity = await this.manager
            .createQueryBuilder(student_entity_1.StudentEntity, this.aliasName)
            .where(`${this.aliasName}.email = :email`, { email })
            .getOne();
        return entity && student_1.Student.hydrate(entity);
    }
    async findStudentByUserIdAndContractId(userId, contractId, id) {
        const entity = await this.manager
            .createQueryBuilder(student_entity_1.StudentEntity, this.aliasName)
            .where(`${this.aliasName}.id = :id`, { id })
            .leftJoinAndSelect(`${this.aliasName}.user`, 'user')
            .leftJoinAndSelect(`${this.aliasName}.contract`, 'contract')
            .leftJoinAndSelect(`${this.aliasName}.attachments`, 'attachments')
            .where('contract.id = :contractId', { contractId })
            .andWhere('user.id = :userId', { userId })
            .getOne();
        if (entity) {
            return student_1.Student.hydrate(entity);
        }
        return null;
    }
    prefixId(entityName) {
        const prefix = entityName.slice(0, 3).toUpperCase();
        return this.nextIdPrefix(prefix);
    }
};
exports.StudentRepository = StudentRepository;
exports.StudentRepository = StudentRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], StudentRepository);


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Student = void 0;
const aggregate_root_1 = __webpack_require__(28);
const email_1 = __webpack_require__(32);
const identifier_1 = __webpack_require__(26);
const address_1 = __webpack_require__(128);
const attachment_1 = __webpack_require__(124);
const contract_1 = __webpack_require__(121);
const course_1 = __webpack_require__(123);
const user_1 = __webpack_require__(129);
class Student extends aggregate_root_1.AggregateRoot {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            fullName: this._fullName,
            email: this._email && this?._email.toValue(),
            gender: this._gender,
            birthDate: this._birthDate && this._birthDate,
            curp: this._curp && this._curp,
            lastDegreeStudy: this._lastDegreeStudy,
            phone: this._phone && this._phone,
            addresses: this._addresses && this._addresses.map((address) => address.toJSON()),
            nationality: this._nationality,
            younger: this._younger,
            fatherFullName: this._fatherFullName && this._fatherFullName,
            studyModality: this._studyModality,
            user: this._user && this._user.toJSON(),
            contract: this._contract && this._contract.toJSON(),
            courses: this._courses && this._courses.map((course) => course.toJSON()),
            attachments: this._attachments &&
                this._attachments.map((attachment) => attachment.toJSON()),
            createdAt: this._createdAt,
        };
    }
    assignUser(user) {
        this._user = user;
    }
    courses() {
        return this._courses && this._courses;
    }
    assignContract(contract) {
        this._contract = contract;
    }
    assignAttachment(attachments) {
        this._attachments = attachments;
    }
    static create(payload) {
        const student = new Student(payload.id);
        student._addresses = payload.addresses;
        student._curp = payload.curp;
        student._email = payload.email;
        student._fatherFullName = payload.fatherFullName && payload.fatherFullName;
        student._fullName = payload.fullName;
        student._gender = payload.gender;
        student._lastDegreeStudy = payload.lastDegreeStudy;
        student._nationality = payload.nationality;
        student._phone = payload.phone;
        student._younger = payload.younger;
        student._studyModality = payload.studyModality;
        student._birthDate = payload.birthDate;
        student._courses = payload.courses;
        return student;
    }
    static hydrate(root) {
        const student = new Student(new identifier_1.Identifier(root?.id));
        student._addresses =
            root?.addresses &&
                root?.addresses.map((address) => address_1.Address.hydrate(address));
        student._curp = root?.curp;
        student._email = root?.email && new email_1.Email({ email: root?.email });
        student._fatherFullName = root?.fatherFullName && root?.fatherFullName;
        student._fullName = root?.fullName;
        student._gender = root?.gender;
        student._lastDegreeStudy = root?.lastDegreeStudy;
        student._nationality = root?.nationality;
        student._phone = root?.phone && root?.phone;
        student._younger = root?.younger;
        student._birthDate = root?.birthDate;
        student._studyModality = root?.studyModality;
        student._user = root?.user && user_1.User.hydrate(root?.user);
        student._contract = root?.contract && contract_1.Contract.hydrate(root?.contract);
        student._courses =
            root?.courses && root?.courses.map((course) => course_1.Course.hydrate(course));
        student._attachments =
            root?.attachments &&
                root?.attachments.map((attachment) => attachment_1.Attachment.hydrate(attachment));
        return student;
    }
}
exports.Student = Student;


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Address = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
class Address extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id && Number(this.id.toString()),
            city: this._city,
            country: this._country,
            streetName: this._streetName,
            createdAt: this._createdAt,
            state: this._state,
            zipCode: this._zipCode,
        };
    }
    static create(payload) {
        const address = new Address(new identifier_1.Identifier(payload.id));
        address._city = payload.city;
        address._country = payload.country;
        address._state = payload.state;
        address._zipCode = payload.zipCode;
        address._streetName = payload.streetName;
        return address;
    }
    static hydrate(root) {
        const address = new Address(new identifier_1.Identifier(root.id));
        address._city = root.city;
        address._country = root.country;
        address._state = root.state;
        address._zipCode = root.zipCode;
        address._streetName = root.streetName;
        address._createdAt = root.createdAt;
        return address;
    }
}
exports.Address = Address;


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const aggregate_root_1 = __webpack_require__(28);
const identifier_1 = __webpack_require__(26);
const student_1 = __webpack_require__(127);
class User extends aggregate_root_1.AggregateRoot {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            name: this._name,
            email: this._email,
            students: this._students && this._students.map((student) => student.toJSON()),
            createdAt: this._createdAt,
        };
    }
    transformResponse() {
        return {
            id: this.id.toString(),
            name: this._name,
            email: this._email,
            createdAt: this._createdAt,
        };
    }
    get password() {
        return this._password;
    }
    static hydrate(root) {
        const user = new User(new identifier_1.Identifier(root.id));
        user._name = root.name;
        user._email = root.email;
        user._password = root.password;
        user._students =
            root.students && root.students.map((student) => student_1.Student.hydrate(student));
        return user;
    }
}
exports.User = User;


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_1 = __webpack_require__(129);
const base_repository_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(11);
const user_entity_1 = __webpack_require__(12);
let UserRepository = class UserRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(user_1.User, dataSource);
        this.dataSource = dataSource;
        this.aliasName = 'user';
    }
    async findById(id) {
        const entity = await this.manager
            .createQueryBuilder(user_entity_1.UserEntity, this.aliasName)
            .leftJoinAndSelect(`${this.aliasName}.tokens`, 'tokens')
            .where(`${this.aliasName}.id = :id`, { id: id })
            .getOne();
        return entity && user_1.User.hydrate(entity);
    }
    async persist(entity) {
        const ormEntity = new user_entity_1.UserEntity(entity);
        ormEntity.updatedAt = new Date();
        await this.manager.save(ormEntity);
        return entity;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], UserRepository);


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.COURSE_REPOSITORY = exports.CONTRACT_REPOSITORY = exports.USER_REPOSITORY = exports.STUDENT_REPOSITORY = void 0;
exports.STUDENT_REPOSITORY = Symbol('STUDENT_REPOSITORY');
exports.USER_REPOSITORY = Symbol('USER_REPOSITORY');
exports.CONTRACT_REPOSITORY = Symbol('CONTRACT_REPOSITORY');
exports.COURSE_REPOSITORY = Symbol('COURSE_REPOSITORY');


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateStudent = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(131);
const student_repository_interface_1 = __webpack_require__(133);
const student_1 = __webpack_require__(127);
const invalid_email_exception_1 = __webpack_require__(134);
const student_errors_enum_1 = __webpack_require__(66);
const email_1 = __webpack_require__(32);
const inject_tokens_2 = __webpack_require__(53);
const mail_provider_service_interface_1 = __webpack_require__(135);
const user_repository_interface_1 = __webpack_require__(136);
const address_1 = __webpack_require__(128);
const course_repository_interface_1 = __webpack_require__(137);
let CreateStudent = class CreateStudent {
    constructor(studentRepository, mailProvideService, userRepository, courseRepository) {
        this.studentRepository = studentRepository;
        this.mailProvideService = mailProvideService;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }
    async process(payload) {
        const student = await this.studentRepository.findByEmail(payload.email);
        const course = await this.courseRepository.findById(payload.courseId);
        if (student) {
            throw new invalid_email_exception_1.StudentNotFoundException(student_errors_enum_1.StudentErrors.STUDENT_ALREADY_EXISTS);
        }
        const user = await this.userRepository.findById(payload.userId);
        const address = address_1.Address.create(payload.address);
        const newStudent = student_1.Student.create({
            id: this.studentRepository.nextId(),
            email: new email_1.Email({ email: payload.email }),
            addresses: [address],
            curp: payload.curp,
            fullName: payload.fullName,
            gender: payload.gender,
            lastDegreeStudy: payload.lastDegreeStudy,
            nationality: payload.nationality,
            phone: payload.phone,
            younger: payload.younger,
            fatherFullName: payload.fatherFullName,
            studyModality: payload.studyModality,
            birthDate: new Date(new Date(payload.birthDate).toISOString().split('T')[0] +
                'T23:59:59.999Z'),
            courses: [course],
        });
        newStudent.assignUser(user);
        await this.mailProvideService.sendStudentConfirmation(payload.email);
        return this.studentRepository.persist(newStudent);
    }
};
exports.CreateStudent = CreateStudent;
exports.CreateStudent = CreateStudent = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.STUDENT_REPOSITORY)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_2.MAIL_PROVIDER_SERVICE)),
    tslib_1.__param(2, (0, common_1.Inject)(inject_tokens_1.USER_REPOSITORY)),
    tslib_1.__param(3, (0, common_1.Inject)(inject_tokens_1.COURSE_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof student_repository_interface_1.IStudentRepository !== "undefined" && student_repository_interface_1.IStudentRepository) === "function" ? _a : Object, typeof (_b = typeof mail_provider_service_interface_1.IMailProviderService !== "undefined" && mail_provider_service_interface_1.IMailProviderService) === "function" ? _b : Object, typeof (_c = typeof user_repository_interface_1.IUserRepository !== "undefined" && user_repository_interface_1.IUserRepository) === "function" ? _c : Object, typeof (_d = typeof course_repository_interface_1.ICourseRespository !== "undefined" && course_repository_interface_1.ICourseRespository) === "function" ? _d : Object])
], CreateStudent);


/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentNotFoundException = void 0;
const domain_exception_1 = __webpack_require__(35);
class StudentNotFoundException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = StudentNotFoundException.name;
    }
}
exports.StudentNotFoundException = StudentNotFoundException;


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const platform_express_1 = __webpack_require__(118);
const uuid_1 = __webpack_require__(139);
const create_student_1 = __webpack_require__(132);
const student_payload_dto_1 = __webpack_require__(140);
const swagger_1 = __webpack_require__(5);
const student_response_dto_1 = __webpack_require__(142);
const login_guard_1 = __webpack_require__(81);
const get_user_id_decorator_1 = __webpack_require__(143);
const create_contract_1 = __webpack_require__(144);
const contract_student_payload_dto_1 = __webpack_require__(148);
const contract_student_response_dto_1 = __webpack_require__(149);
const annual_payment_1 = __webpack_require__(150);
const contract_student_monthly_payment_dto_1 = __webpack_require__(151);
const monthlyPayment_1 = __webpack_require__(152);
const contract_sign_now_1 = __webpack_require__(153);
const get_contract_by_id_1 = __webpack_require__(156);
const upload_file_student_1 = __webpack_require__(157);
const files_data_interface_1 = __webpack_require__(159);
const invalid_file_type_exception_1 = __webpack_require__(160);
const student_errors_enum_1 = __webpack_require__(66);
const get_data_student_by_contract_id_1 = __webpack_require__(161);
const list_all_course_1 = __webpack_require__(162);
let StudentController = class StudentController {
    constructor(createStudent, createContractStuden, annualPayment, monthlyPayment, contracSignNow, getContractById, uploadFileStudent, getDataStudentByContractId, listAllCourse) {
        this.createStudent = createStudent;
        this.createContractStuden = createContractStuden;
        this.annualPayment = annualPayment;
        this.monthlyPayment = monthlyPayment;
        this.contracSignNow = contracSignNow;
        this.getContractById = getContractById;
        this.uploadFileStudent = uploadFileStudent;
        this.getDataStudentByContractId = getDataStudentByContractId;
        this.listAllCourse = listAllCourse;
        this.regExp = /^(.*?)(\.[^.]*$|$)/;
    }
    create(payload, userId) {
        payload.userId = userId;
        return this.createStudent.process(payload);
    }
    async createContract(id, payload) {
        payload.studentId = id;
        return this.createContractStuden.process(payload);
    }
    async addAnnualPayment(contractId, payload) {
        payload.contractId = contractId;
        return this.annualPayment.process(payload);
    }
    async addMonthlyPayment(contractId, payload) {
        payload.contractId = contractId;
        return this.monthlyPayment.process(payload);
    }
    async contract(id, studentId) {
        const payload = {
            contractId: id,
            studentId,
        };
        return this.contracSignNow.process(payload);
    }
    async contractWithDocument(id) {
        return this.getContractById.process(id);
    }
    async putFileStudent(studentId, files, types) {
        if (!files.files) {
            throw new invalid_file_type_exception_1.InvalidFileTypeException(student_errors_enum_1.StudentErrors.STUDENT_FILE_ERROR);
        }
        const parsedTypes = JSON.parse(types);
        const newFiles = files.files.map((file, i) => {
            const type = parsedTypes.find((type, index) => {
                if (index === i) {
                    return type;
                }
            });
            return {
                ...file,
                documentType: type,
            };
        });
        const buffers = [];
        const attachments = newFiles.map((file) => {
            const fileName = file.originalname.replace(this.regExp, `${(0, uuid_1.v4)()}$2`);
            const attachment = {
                extension: file.originalname.split('.')[1],
                fileName,
                mediaType: file.mimetype,
                name: file.originalname,
                documentType: file.documentType,
            };
            buffers.push(file.buffer);
            return attachment;
        });
        const payload = {
            attachments,
            files: buffers,
            studentId,
        };
        return this.uploadFileStudent.process(payload);
    }
    async getDataStudent(contractId, id, userId) {
        return this.getDataStudentByContractId.process({ contractId, userId, id });
    }
    async courses() {
        return this.listAllCourse.process();
    }
};
exports.StudentController = StudentController;
tslib_1.__decorate([
    (0, swagger_1.ApiResponse)({ type: student_response_dto_1.StudentResponseDto }),
    (0, common_1.Post)('/'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, get_user_id_decorator_1.UserId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof student_payload_dto_1.StudentPayloadDto !== "undefined" && student_payload_dto_1.StudentPayloadDto) === "function" ? _k : Object, String]),
    tslib_1.__metadata("design:returntype", void 0)
], StudentController.prototype, "create", null);
tslib_1.__decorate([
    (0, swagger_1.ApiResponse)({ type: contract_student_response_dto_1.CreateContractResponseDto }),
    (0, common_1.Post)('/:id/contracts'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_l = typeof contract_student_payload_dto_1.ContractStudentPayloadDto !== "undefined" && contract_student_payload_dto_1.ContractStudentPayloadDto) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "createContract", null);
tslib_1.__decorate([
    (0, common_1.Post)('/contract/:contractId/annual'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Param)('contractId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_m = typeof contract_student_monthly_payment_dto_1.ContractStudentPaymentDto !== "undefined" && contract_student_monthly_payment_dto_1.ContractStudentPaymentDto) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "addAnnualPayment", null);
tslib_1.__decorate([
    (0, common_1.Post)('/contract/:contractId/monthly'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Param)('contractId')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_o = typeof contract_student_monthly_payment_dto_1.ContractStudentPaymentDto !== "undefined" && contract_student_monthly_payment_dto_1.ContractStudentPaymentDto) === "function" ? _o : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "addMonthlyPayment", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:studentId/contract/:id'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Param)('studentId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "contract", null);
tslib_1.__decorate([
    (0, swagger_1.ApiResponse)({ type: contract_student_response_dto_1.CreateContractResponseDto }),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    (0, common_1.Get)('/contract/:id/document'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "contractWithDocument", null);
tslib_1.__decorate([
    (0, common_1.Post)('/:studentId'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'files', maxCount: 6 }])),
    tslib_1.__param(0, (0, common_1.Param)('studentId')),
    tslib_1.__param(1, (0, common_1.UploadedFiles)()),
    tslib_1.__param(2, (0, common_1.Body)('types')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_p = typeof files_data_interface_1.IFilesData !== "undefined" && files_data_interface_1.IFilesData) === "function" ? _p : Object, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "putFileStudent", null);
tslib_1.__decorate([
    (0, common_1.Get)('/:id/attachment/contract/:contractId'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Param)('contractId')),
    tslib_1.__param(1, (0, common_1.Param)('id')),
    tslib_1.__param(2, (0, get_user_id_decorator_1.UserId)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "getDataStudent", null);
tslib_1.__decorate([
    (0, common_1.Get)('/courses'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], StudentController.prototype, "courses", null);
exports.StudentController = StudentController = tslib_1.__decorate([
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, swagger_1.ApiTags)('Students'),
    (0, common_1.Controller)('student'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_student_1.CreateStudent !== "undefined" && create_student_1.CreateStudent) === "function" ? _a : Object, typeof (_b = typeof create_contract_1.CreateContract !== "undefined" && create_contract_1.CreateContract) === "function" ? _b : Object, typeof (_c = typeof annual_payment_1.AnnualPayment !== "undefined" && annual_payment_1.AnnualPayment) === "function" ? _c : Object, typeof (_d = typeof monthlyPayment_1.MonthlyPayment !== "undefined" && monthlyPayment_1.MonthlyPayment) === "function" ? _d : Object, typeof (_e = typeof contract_sign_now_1.ContractSignNow !== "undefined" && contract_sign_now_1.ContractSignNow) === "function" ? _e : Object, typeof (_f = typeof get_contract_by_id_1.GetContractById !== "undefined" && get_contract_by_id_1.GetContractById) === "function" ? _f : Object, typeof (_g = typeof upload_file_student_1.UploadFileStudent !== "undefined" && upload_file_student_1.UploadFileStudent) === "function" ? _g : Object, typeof (_h = typeof get_data_student_by_contract_id_1.GetDataStudentByContractId !== "undefined" && get_data_student_by_contract_id_1.GetDataStudentByContractId) === "function" ? _h : Object, typeof (_j = typeof list_all_course_1.ListAllCourse !== "undefined" && list_all_course_1.ListAllCourse) === "function" ? _j : Object])
], StudentController);


/***/ }),
/* 139 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentPayloadDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(141);
const class_validator_1 = __webpack_require__(80);
class Address {
}
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], Address.prototype, "zipCode", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "city", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "state", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "country", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], Address.prototype, "streetName", void 0);
class StudentPayloadDto {
}
exports.StudentPayloadDto = StudentPayloadDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, { message: 'The string cannot be longer than 50 characters' }),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], StudentPayloadDto.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "curp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50, { message: 'The string cannot be longer than 50 characters' }),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "lastDegreeStudy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(10, { message: 'The string cannot be longer than 50 characters' }),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Address }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Address),
    tslib_1.__metadata("design:type", Address)
], StudentPayloadDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "nationality", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Boolean)
], StudentPayloadDto.prototype, "younger", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "fatherFullName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "studyModality", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], StudentPayloadDto.prototype, "courseId", void 0);


/***/ }),
/* 141 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StudentResponseDto = exports.StudentData = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
class StudentData {
}
exports.StudentData = StudentData;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "curp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "lastDegreeStudy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "nationality", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], StudentData.prototype, "younger", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    tslib_1.__metadata("design:type", String)
], StudentData.prototype, "fatherFullName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], StudentData.prototype, "createdAt", void 0);
class StudentResponseDto {
}
exports.StudentResponseDto = StudentResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: StudentData }),
    tslib_1.__metadata("design:type", StudentData)
], StudentResponseDto.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Number)
], StudentResponseDto.prototype, "statusCode", void 0);


/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserId = void 0;
const common_1 = __webpack_require__(2);
exports.UserId = (0, common_1.createParamDecorator)((_data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user.id;
});


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContract = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(131);
const contract_repository_interface_1 = __webpack_require__(145);
const contract_1 = __webpack_require__(121);
const student_repository_interface_1 = __webpack_require__(133);
const contract_exception_1 = __webpack_require__(146);
const student_errors_enum_1 = __webpack_require__(66);
const course_not_found_exception_1 = __webpack_require__(147);
let CreateContract = class CreateContract {
    constructor(contractRepository, studentRepository) {
        this.contractRepository = contractRepository;
        this.studentRepository = studentRepository;
    }
    async process(command) {
        const { studentId, courseId } = command;
        const student = await this.studentRepository.findById(studentId);
        student.courses().forEach((course) => {
            if (course.id.toString() === courseId) {
                const { contract } = course.toJSON();
                if (contract) {
                    if (contract.activatedContract) {
                        throw new contract_exception_1.ContractActiveException(student_errors_enum_1.ContractErrors.CONTRACT_ACTIVED_EXIST);
                    }
                }
            }
            else {
                throw new course_not_found_exception_1.CourseNotFoundException(student_errors_enum_1.CourseErrors.COURSE_NOT_FOUND);
            }
        });
        const contract = contract_1.Contract.create({
            annualRegistration: command.annualRegistration,
            curp: command.curp,
            dateBirthStudent: new Date(new Date(command.dateBirthStudent).toISOString().split('T')[0] +
                'T23:59:59.999Z'),
            id: this.contractRepository.nextId(),
            modality: command.modality,
            monthlyPayments: command.monthlyPayments.map((data) => {
                return {
                    ...data,
                    paymentDate: new Date(new Date(data.paymentDate).toISOString().split('T')[0] +
                        'T23:59:59.999Z'),
                };
            }),
            scholarship: command.scholarship,
            schoolName: command.schoolName,
            startDateService: new Date(new Date(command.startDateService).toISOString().split('T')[0] +
                'T23:59:59.999Z'),
            studentPhone: command.scholarship,
            studentsNanme: command.studentsNanme,
            course: student.courses().find((course) => course && course),
            activatedContract: true,
        });
        return this.contractRepository.persist(contract);
    }
};
exports.CreateContract = CreateContract;
exports.CreateContract = CreateContract = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.CONTRACT_REPOSITORY)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_1.STUDENT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof contract_repository_interface_1.IContractRepository !== "undefined" && contract_repository_interface_1.IContractRepository) === "function" ? _a : Object, typeof (_b = typeof student_repository_interface_1.IStudentRepository !== "undefined" && student_repository_interface_1.IStudentRepository) === "function" ? _b : Object])
], CreateContract);


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractActiveException = void 0;
const domain_exception_1 = __webpack_require__(35);
class ContractActiveException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = ContractActiveException.name;
    }
}
exports.ContractActiveException = ContractActiveException;


/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CourseNotFoundException = void 0;
const domain_exception_1 = __webpack_require__(35);
class CourseNotFoundException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = CourseNotFoundException.name;
    }
}
exports.CourseNotFoundException = CourseNotFoundException;


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractStudentPayloadDto = exports.MonthlyPaymentDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_validator_1 = __webpack_require__(80);
const class_transformer_1 = __webpack_require__(141);
class MonthlyPaymentDto {
}
exports.MonthlyPaymentDto = MonthlyPaymentDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], MonthlyPaymentDto.prototype, "level", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], MonthlyPaymentDto.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], MonthlyPaymentDto.prototype, "paymentDate", void 0);
class ContractStudentPayloadDto {
}
exports.ContractStudentPayloadDto = ContractStudentPayloadDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "studentsNanme", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "schoolName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ContractStudentPayloadDto.prototype, "dateBirthStudent", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "curp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "studentPhone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "scholarship", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], ContractStudentPayloadDto.prototype, "startDateService", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "modality", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "annualRegistration", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [MonthlyPaymentDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MonthlyPaymentDto),
    tslib_1.__metadata("design:type", Array)
], ContractStudentPayloadDto.prototype, "monthlyPayments", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], ContractStudentPayloadDto.prototype, "courseId", void 0);


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateContractResponseDto = exports.ContractDto = exports.StudentResponseContractDto = exports.MonthlyPaymentResponseDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
class MonthlyPaymentResponseDto {
}
exports.MonthlyPaymentResponseDto = MonthlyPaymentResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MonthlyPaymentResponseDto.prototype, "level", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], MonthlyPaymentResponseDto.prototype, "amount", void 0);
class StudentResponseContractDto {
}
exports.StudentResponseContractDto = StudentResponseContractDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "birthDate", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "curp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "lastDegreeStudy", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "phone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "nationality", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], StudentResponseContractDto.prototype, "younger", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({
        nullable: true,
    }),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "fatherFullName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "studyModality", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], StudentResponseContractDto.prototype, "createdAt", void 0);
class ContractDto {
}
exports.ContractDto = ContractDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "studentsNanme", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "schoolName", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ContractDto.prototype, "dateBirthStudent", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "curp", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "studentPhone", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "scholarship", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: Date }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ContractDto.prototype, "startDateService", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "modality", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "annualRegistration", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: [MonthlyPaymentResponseDto] }),
    tslib_1.__metadata("design:type", Array)
], ContractDto.prototype, "monthlyPayments", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: StudentResponseContractDto }),
    tslib_1.__metadata("design:type", StudentResponseContractDto)
], ContractDto.prototype, "student", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    tslib_1.__metadata("design:type", String)
], ContractDto.prototype, "documentId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    tslib_1.__metadata("design:type", Boolean)
], ContractDto.prototype, "signature", void 0);
class CreateContractResponseDto {
}
exports.CreateContractResponseDto = CreateContractResponseDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ type: ContractDto }),
    tslib_1.__metadata("design:type", ContractDto)
], CreateContractResponseDto.prototype, "data", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Status code of the response' }),
    tslib_1.__metadata("design:type", Number)
], CreateContractResponseDto.prototype, "statusCode", void 0);


/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnnualPayment = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(131);
const contract_repository_interface_1 = __webpack_require__(145);
let AnnualPayment = class AnnualPayment {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async process(payload) {
        const { contractId, amount, paymentDate } = payload;
        const contract = await this.contractRepository.findById(contractId);
        contract.twentyPercentDiscount(paymentDate, amount);
        return this.contractRepository.persist(contract);
    }
};
exports.AnnualPayment = AnnualPayment;
exports.AnnualPayment = AnnualPayment = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.CONTRACT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof contract_repository_interface_1.IContractRepository !== "undefined" && contract_repository_interface_1.IContractRepository) === "function" ? _a : Object])
], AnnualPayment);


/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractStudentPaymentDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const class_transformer_1 = __webpack_require__(141);
const class_validator_1 = __webpack_require__(80);
class ContractStudentPaymentDto {
}
exports.ContractStudentPaymentDto = ContractStudentPaymentDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], ContractStudentPaymentDto.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Date),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ContractStudentPaymentDto.prototype, "paymentDate", void 0);


/***/ }),
/* 152 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MonthlyPayment = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(131);
const contract_repository_interface_1 = __webpack_require__(145);
let MonthlyPayment = class MonthlyPayment {
    constructor(contractRepository) {
        this.contractRepository = contractRepository;
    }
    async process(payload) {
        const { contractId, amount, paymentDate } = payload;
        const contract = await this.contractRepository.findById(contractId);
        contract.thirtyPercentDiscount(paymentDate, amount);
        return this.contractRepository.persist(contract);
    }
};
exports.MonthlyPayment = MonthlyPayment;
exports.MonthlyPayment = MonthlyPayment = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.CONTRACT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof contract_repository_interface_1.IContractRepository !== "undefined" && contract_repository_interface_1.IContractRepository) === "function" ? _a : Object])
], MonthlyPayment);


/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractSignNow = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const docusign_service_interface_1 = __webpack_require__(154);
const inject_tokens_1 = __webpack_require__(53);
const inject_tokens_2 = __webpack_require__(131);
const contract_repository_interface_1 = __webpack_require__(145);
const config_1 = __webpack_require__(4);
const signature_exception_1 = __webpack_require__(155);
const student_errors_enum_1 = __webpack_require__(66);
const student_repository_interface_1 = __webpack_require__(133);
let ContractSignNow = class ContractSignNow {
    constructor(signNowService, contractRepository, studentRepository, config) {
        this.signNowService = signNowService;
        this.contractRepository = contractRepository;
        this.studentRepository = studentRepository;
        this.config = config;
        this.documentId = this.config.get('signNow').documentId;
    }
    async process(command) {
        const { contractId, studentId } = command;
        const contract = await this.contractRepository.findById(contractId);
        const student = await this.studentRepository.findById(studentId);
        const { schoolName, dateBirthStudent, curp, scholarship, startDateService, modality, createdAt, signature, } = contract.toJSON();
        if (signature) {
            throw new signature_exception_1.SignatureErrorException(student_errors_enum_1.ContractErrors.CONTRACT_SIGNATURE_ALREADY_EXIST);
        }
        const { fullName, addresses, phone, email } = student.toJSON();
        const { streetName, zipCode } = addresses.find((add) => add);
        const payload = {
            fullName,
            schoolName,
            dateBirthStudent: this.formatDate(dateBirthStudent),
            curp,
            address: `${streetName} ${zipCode}`,
            phone,
            scholarship,
            startDateService: this.formatDate(startDateService),
            modality,
            createdAt: this.formatDate(createdAt),
            email,
        };
        const documentData = await this.signNowService.prefillDocumentFields(this.documentId, payload);
        const documentId = documentData.id;
        const roleId = await this.signNowService.getRoleIdByDocumentId(documentId);
        payload.roleId = roleId;
        const sendInvite = await this.signNowService.sendInviteSignature(documentId, payload);
        contract.assignDocumentId(sendInvite.documentIdByTemplate);
        await this.contractRepository.persist(contract);
        return this.signNowService.getUrlDocument(documentId);
    }
    formatDate(date) {
        const data = date
            .toLocaleDateString('es-MX', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
            .split('/');
        const [day, month, year] = data;
        return `${year}-${month}-${day}`;
    }
};
exports.ContractSignNow = ContractSignNow;
exports.ContractSignNow = ContractSignNow = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.SIGN_NOW_SERVICE)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_2.CONTRACT_REPOSITORY)),
    tslib_1.__param(2, (0, common_1.Inject)(inject_tokens_2.STUDENT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof docusign_service_interface_1.ISignNowService !== "undefined" && docusign_service_interface_1.ISignNowService) === "function" ? _a : Object, typeof (_b = typeof contract_repository_interface_1.IContractRepository !== "undefined" && contract_repository_interface_1.IContractRepository) === "function" ? _b : Object, typeof (_c = typeof student_repository_interface_1.IStudentRepository !== "undefined" && student_repository_interface_1.IStudentRepository) === "function" ? _c : Object, typeof (_d = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _d : Object])
], ContractSignNow);


/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SignatureErrorException = void 0;
const domain_exception_1 = __webpack_require__(35);
class SignatureErrorException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = SignatureErrorException.name;
    }
}
exports.SignatureErrorException = SignatureErrorException;


/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetContractById = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(53);
const docusign_service_interface_1 = __webpack_require__(154);
const inject_tokens_2 = __webpack_require__(131);
const contract_repository_interface_1 = __webpack_require__(145);
let GetContractById = class GetContractById {
    constructor(signNowService, contractRepository) {
        this.signNowService = signNowService;
        this.contractRepository = contractRepository;
    }
    async process(contractId) {
        const contract = await this.contractRepository.findById(contractId);
        const { documentId } = contract.toJSON();
        const document = await this.signNowService.getDocumentById(documentId);
        if (document.signatures.length > 0) {
            contract.assignSignature();
        }
        return this.contractRepository.persist(contract);
    }
};
exports.GetContractById = GetContractById;
exports.GetContractById = GetContractById = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.SIGN_NOW_SERVICE)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_2.CONTRACT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof docusign_service_interface_1.ISignNowService !== "undefined" && docusign_service_interface_1.ISignNowService) === "function" ? _a : Object, typeof (_b = typeof contract_repository_interface_1.IContractRepository !== "undefined" && contract_repository_interface_1.IContractRepository) === "function" ? _b : Object])
], GetContractById);


/***/ }),
/* 157 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadFileStudent = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(131);
const student_repository_interface_1 = __webpack_require__(133);
const attachment_1 = __webpack_require__(124);
const inject_tokens_2 = __webpack_require__(53);
const aws_service_interface_1 = __webpack_require__(158);
const contract_exception_1 = __webpack_require__(146);
const student_errors_enum_1 = __webpack_require__(66);
let UploadFileStudent = class UploadFileStudent {
    constructor(studentRepository, awsService) {
        this.studentRepository = studentRepository;
        this.awsService = awsService;
    }
    async process(payload) {
        const { attachments, files, studentId } = payload;
        const student = await this.studentRepository.findById(studentId);
        const courses = student.courses();
        const course = courses.find((course) => course.toJSON().contract.activatedContract && course);
        if (!course) {
            throw new contract_exception_1.ContractActiveException(student_errors_enum_1.ContractErrors.CONTRACT_NOT_ACTIVATED);
        }
        const newAttachment = attachments.map((attachment) => attachment_1.Attachment.create(attachment));
        course.assignAttachment(newAttachment);
        attachments.forEach((attachment) => {
            files.forEach(async (file) => {
                await this.awsService.putFile(attachment.fileName, file);
            });
        });
        return this.studentRepository.persist(student);
    }
};
exports.UploadFileStudent = UploadFileStudent;
exports.UploadFileStudent = UploadFileStudent = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.STUDENT_REPOSITORY)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_2.AWS_SERVICE)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof student_repository_interface_1.IStudentRepository !== "undefined" && student_repository_interface_1.IStudentRepository) === "function" ? _a : Object, typeof (_b = typeof aws_service_interface_1.IAwsService !== "undefined" && aws_service_interface_1.IAwsService) === "function" ? _b : Object])
], UploadFileStudent);


/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 160 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidFileTypeException = void 0;
const domain_exception_1 = __webpack_require__(35);
class InvalidFileTypeException extends domain_exception_1.DomainException {
    constructor(message) {
        super(message);
        this.name = InvalidFileTypeException.name;
    }
}
exports.InvalidFileTypeException = InvalidFileTypeException;


/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetDataStudentByContractId = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(131);
const student_repository_interface_1 = __webpack_require__(133);
let GetDataStudentByContractId = class GetDataStudentByContractId {
    constructor(studentRepository) {
        this.studentRepository = studentRepository;
    }
    async process(command) {
        const { contractId, userId, id } = command;
        return this.studentRepository.findStudentByUserIdAndContractId(userId, contractId, id);
    }
};
exports.GetDataStudentByContractId = GetDataStudentByContractId;
exports.GetDataStudentByContractId = GetDataStudentByContractId = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.STUDENT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof student_repository_interface_1.IStudentRepository !== "undefined" && student_repository_interface_1.IStudentRepository) === "function" ? _a : Object])
], GetDataStudentByContractId);


/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListAllCourse = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(131);
const course_repository_interface_1 = __webpack_require__(137);
let ListAllCourse = class ListAllCourse {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }
    async process() {
        return this.courseRepository.findAllCourses();
    }
};
exports.ListAllCourse = ListAllCourse;
exports.ListAllCourse = ListAllCourse = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.COURSE_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof course_repository_interface_1.ICourseRespository !== "undefined" && course_repository_interface_1.ICourseRespository) === "function" ? _a : Object])
], ListAllCourse);


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripeModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const custom_providers_1 = __webpack_require__(164);
const stripe_controller_1 = __webpack_require__(172);
const create_payment_1 = __webpack_require__(173);
const auth_module_1 = __webpack_require__(92);
const webhook_stripe_data_1 = __webpack_require__(178);
let StripeModule = class StripeModule {
};
exports.StripeModule = StripeModule;
exports.StripeModule = StripeModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [stripe_controller_1.StripeController],
        imports: [auth_module_1.AuthModule],
        providers: [
            custom_providers_1.stripeService,
            create_payment_1.CreatePayment,
            webhook_stripe_data_1.WebhookStripeData,
            custom_providers_1.contractRepository,
        ],
    })
], StripeModule);


/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.contractRepository = exports.stripeService = void 0;
const contract_repository_1 = __webpack_require__(165);
const stripe_service_1 = __webpack_require__(169);
const inject_tokens_1 = __webpack_require__(171);
exports.stripeService = {
    provide: inject_tokens_1.STRIPE_SERVICE,
    useClass: stripe_service_1.StripeService,
};
exports.contractRepository = {
    provide: inject_tokens_1.CONTRACT_REPOSITORY,
    useClass: contract_repository_1.ContractRepository,
};


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ContractRepository = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const contract_1 = __webpack_require__(166);
const base_repository_1 = __webpack_require__(24);
const typeorm_1 = __webpack_require__(11);
const contract_entity_1 = __webpack_require__(20);
let ContractRepository = class ContractRepository extends base_repository_1.BaseRepository {
    constructor(dataSource) {
        super(contract_1.Contract, dataSource);
        this.dataSource = dataSource;
        this.aliasName = 'contract';
    }
    async findById(id) {
        const entity = await this.manager
            .createQueryBuilder(contract_entity_1.ContractEntity, this.aliasName)
            .where(`${this.aliasName}.id = :id`, { id })
            .leftJoinAndSelect(`${this.aliasName}.course`, 'course')
            .getOne();
        return entity && contract_1.Contract.hydrate(entity);
    }
    async persist(entity) {
        const ormEntity = new contract_entity_1.ContractEntity(entity);
        ormEntity.updatedAt = new Date();
        await this.manager.save(ormEntity);
        return entity;
    }
};
exports.ContractRepository = ContractRepository;
exports.ContractRepository = ContractRepository = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof typeorm_1.DataSource !== "undefined" && typeorm_1.DataSource) === "function" ? _a : Object])
], ContractRepository);


/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Contract = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
const payment_type_enum_1 = __webpack_require__(167);
const course_1 = __webpack_require__(168);
class Contract extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            annualRegistration: this._annualRegistration,
            paymentAnnualId: this._payment_annual_id && this._payment_annual_id,
            curp: this._curp && this._curp,
            dateBirthStudent: this._dateBirthStudent,
            modality: this._modality,
            activatedContract: this._activatedContract,
            monthlyPayments: this._monthlyPayments,
            scholarship: this._scholarship,
            schoolName: this._schoolName,
            startDateService: this._startDateService,
            studentPhone: this._studentPhone,
            studentsNanme: this._studentsNanme,
            course: this._course && this._course.toJSON(),
            documentId: this._documentId && this._documentId,
            signature: this._signature && this._signature,
            createdAt: this._createdAt,
        };
    }
    assignPayment(paymentId, type, level) {
        if (type === payment_type_enum_1.PaymentTypeEnum.ANNUAL_REGISTRATION) {
            this._payment_annual_id = paymentId;
        }
        if (type === payment_type_enum_1.PaymentTypeEnum.MONTHLY_PAYMENT) {
            this._monthlyPayments = this._monthlyPayments.map((data) => {
                if (data.level === level) {
                    data.paymentId = paymentId;
                }
                return data;
            });
        }
    }
    static hydrate(root) {
        const contract = new Contract(new identifier_1.Identifier(root.id));
        contract._annualRegistration = root.annualRegistration;
        contract._payment_annual_id = root.paymentAnnualId && root.paymentAnnualId;
        contract._curp = root.curp && root.curp;
        contract._dateBirthStudent = root.dateBirthStudent;
        contract._activatedContract = root.activatedContract;
        contract._modality = root.modality;
        contract._monthlyPayments = root.monthlyPayments;
        contract._scholarship = root.scholarship;
        contract._schoolName = root.schoolName;
        contract._startDateService = root.startDateService;
        contract._studentPhone = root.studentPhone;
        contract._studentsNanme = root.studentsNanme;
        contract._documentId = root.documentId && root.documentId;
        contract._signature = root.signature && root.signature;
        contract._course = root.course && course_1.Course.hydrate(root.course);
        return contract;
    }
}
exports.Contract = Contract;


/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentTypeEnum = void 0;
var PaymentTypeEnum;
(function (PaymentTypeEnum) {
    PaymentTypeEnum["ANNUAL_REGISTRATION"] = "ANNUAL_REGISTRATION";
    PaymentTypeEnum["MONTHLY_PAYMENT"] = "MONTHLY_PAYMENT";
})(PaymentTypeEnum || (exports.PaymentTypeEnum = PaymentTypeEnum = {}));


/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Course = void 0;
const domain_entity_1 = __webpack_require__(29);
const identifier_1 = __webpack_require__(26);
const contract_1 = __webpack_require__(166);
class Course extends domain_entity_1.Entity {
    constructor(id) {
        super(id);
    }
    toJSON() {
        return {
            id: this.id.toString(),
            name: this._name,
            description: this._description,
            contract: this._contract && this._contract.toJSON(),
            createdAt: this._createdAt,
        };
    }
    static hydrate(root) {
        const course = new Course(new identifier_1.Identifier(root.id));
        course._name = root.name;
        course._description = root.description;
        course._createdAt = root.createdAt;
        course._contract = root.contract && contract_1.Contract.hydrate(root.contract);
        return course;
    }
}
exports.Course = Course;


/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripeService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(4);
const stripe_1 = tslib_1.__importDefault(__webpack_require__(170));
let StripeService = class StripeService {
    constructor(config) {
        this.config = config;
        const secretKey = this.config.get('stripe').secretKey;
        this.stripe = new stripe_1.default(secretKey, {
            apiVersion: '2024-06-20',
        });
        this.endPointSecret = this.config.get('stripe').endpointSecret;
    }
    async createCustomer(email, name) {
        return await this.stripe.customers.create({
            email,
            name,
        });
    }
    async createPaymentIntent(amount, currency) {
        const response = await this.stripe.paymentIntents.create({
            amount,
            currency,
        });
        return response.invoice;
    }
    async getLineItem(paymentIntentId) {
        const sessions = await this.stripe.checkout.sessions.list({
            payment_intent: paymentIntentId,
        });
        const session = sessions.data[0];
        const lineItems = await this.stripe.checkout.sessions.listLineItems(session.id);
        return lineItems.data[0].description;
    }
    async checkoutPayment(payload) {
        const { amount, contractName, currency } = payload;
        const response = await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: currency,
                        product_data: {
                            name: contractName,
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://stripe.com/success',
            cancel_url: 'https://stripe.com/cancel',
        });
        return response.url;
    }
    listeningEventsStripe(request) {
        const sig = request.headers['stripe-signature'];
        try {
            const event = this.stripe.webhooks.constructEvent(request.rawBody, sig, this.endPointSecret);
            let paymentIntentSucceeded = null;
            switch (event.type) {
                case 'payment_intent.succeeded':
                    paymentIntentSucceeded = event.data.object;
                    return paymentIntentSucceeded.id;
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
        }
        catch (error) {
            console.log(`Webhook signature verification failed.`, error);
            throw new Error(`Webhook Error: ${error.message}`);
        }
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], StripeService);


/***/ }),
/* 170 */
/***/ ((module) => {

module.exports = require("stripe");

/***/ }),
/* 171 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CONTRACT_REPOSITORY = exports.STRIPE_SERVICE = void 0;
exports.STRIPE_SERVICE = Symbol('STRIPE_SERVICE');
exports.CONTRACT_REPOSITORY = Symbol('CONTRACT_REPOSITORY');


/***/ }),
/* 172 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StripeController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const create_payment_1 = __webpack_require__(173);
const payload_payment_send_dto_1 = __webpack_require__(177);
const login_guard_1 = __webpack_require__(81);
const swagger_1 = __webpack_require__(5);
const webhook_stripe_data_1 = __webpack_require__(178);
const express_1 = __webpack_require__(179);
let StripeController = class StripeController {
    constructor(createPayment, webhookStripeData) {
        this.createPayment = createPayment;
        this.webhookStripeData = webhookStripeData;
    }
    async createPaymentStripe(payload) {
        return this.createPayment.process(payload);
    }
    getDataWebHook(request) {
        this.webhookStripeData.process(request);
    }
};
exports.StripeController = StripeController;
tslib_1.__decorate([
    (0, common_1.Post)('/send'),
    (0, common_1.UseGuards)(login_guard_1.LoginGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof payload_payment_send_dto_1.PayloadPaymentSendDto !== "undefined" && payload_payment_send_dto_1.PayloadPaymentSendDto) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], StripeController.prototype, "createPaymentStripe", null);
tslib_1.__decorate([
    (0, common_1.Post)('/webhook'),
    (0, common_1.HttpCode)(200),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof express_1.Request !== "undefined" && express_1.Request) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], StripeController.prototype, "getDataWebHook", null);
exports.StripeController = StripeController = tslib_1.__decorate([
    (0, common_1.Controller)('payments'),
    (0, swagger_1.ApiTags)('Payments'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof create_payment_1.CreatePayment !== "undefined" && create_payment_1.CreatePayment) === "function" ? _a : Object, typeof (_b = typeof webhook_stripe_data_1.WebhookStripeData !== "undefined" && webhook_stripe_data_1.WebhookStripeData) === "function" ? _b : Object])
], StripeController);


/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreatePayment = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(171);
const stripe_service_interface_1 = __webpack_require__(174);
const currencies_enum_1 = __webpack_require__(175);
const contrac_repository_interface_1 = __webpack_require__(176);
let CreatePayment = class CreatePayment {
    constructor(stripeService, contractRepository) {
        this.stripeService = stripeService;
        this.contractRepository = contractRepository;
    }
    async process(payload) {
        const { amount, currency, contractId, type, level } = payload;
        const contract = await this.contractRepository.findById(contractId);
        const { course: { name }, } = contract.toJSON();
        const convertAmountCent = currency === currencies_enum_1.Currencies.MXN ? amount * 100 : amount;
        let contractName = '';
        level && (contractName = `${name}-${contractId}-${type}-${level}`);
        !level && (contractName = `${name}-${contractId}-${type}`);
        const payloadPayment = {
            amount: convertAmountCent,
            currency,
            contractName,
        };
        return this.stripeService.checkoutPayment(payloadPayment);
    }
};
exports.CreatePayment = CreatePayment;
exports.CreatePayment = CreatePayment = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.STRIPE_SERVICE)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_1.CONTRACT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof stripe_service_interface_1.IStripeService !== "undefined" && stripe_service_interface_1.IStripeService) === "function" ? _a : Object, typeof (_b = typeof contrac_repository_interface_1.IContractRepository !== "undefined" && contrac_repository_interface_1.IContractRepository) === "function" ? _b : Object])
], CreatePayment);


/***/ }),
/* 174 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Currencies = void 0;
var Currencies;
(function (Currencies) {
    Currencies["MXN"] = "MXN";
    Currencies["USD"] = "USD";
})(Currencies || (exports.Currencies = Currencies = {}));


/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PayloadPaymentSendDto = void 0;
const tslib_1 = __webpack_require__(1);
const swagger_1 = __webpack_require__(5);
const currencies_enum_1 = __webpack_require__(175);
const class_validator_1 = __webpack_require__(80);
const payment_type_enum_1 = __webpack_require__(167);
class PayloadPaymentSendDto {
}
exports.PayloadPaymentSendDto = PayloadPaymentSendDto;
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], PayloadPaymentSendDto.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: currencies_enum_1.Currencies }),
    (0, class_validator_1.IsEnum)(currencies_enum_1.Currencies),
    tslib_1.__metadata("design:type", typeof (_a = typeof currencies_enum_1.Currencies !== "undefined" && currencies_enum_1.Currencies) === "function" ? _a : Object)
], PayloadPaymentSendDto.prototype, "currency", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], PayloadPaymentSendDto.prototype, "contractId", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], PayloadPaymentSendDto.prototype, "level", void 0);
tslib_1.__decorate([
    (0, swagger_1.ApiProperty)({ enum: payment_type_enum_1.PaymentTypeEnum }),
    (0, class_validator_1.IsEnum)(payment_type_enum_1.PaymentTypeEnum),
    tslib_1.__metadata("design:type", typeof (_b = typeof payment_type_enum_1.PaymentTypeEnum !== "undefined" && payment_type_enum_1.PaymentTypeEnum) === "function" ? _b : Object)
], PayloadPaymentSendDto.prototype, "type", void 0);


/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookStripeData = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const inject_tokens_1 = __webpack_require__(171);
const stripe_service_interface_1 = __webpack_require__(174);
const contrac_repository_interface_1 = __webpack_require__(176);
let WebhookStripeData = class WebhookStripeData {
    constructor(stripeService, contractRepository) {
        this.stripeService = stripeService;
        this.contractRepository = contractRepository;
    }
    async process(body) {
        const res = this.stripeService.listeningEventsStripe(body);
        if (res) {
            let level = null;
            const data = await this.stripeService.getLineItem(res);
            const dataItemSplit = data.split('-');
            const contractId = dataItemSplit[1];
            const type = dataItemSplit[2];
            level = dataItemSplit[3] && dataItemSplit[3];
            const contract = await this.contractRepository.findById(contractId);
            contract.assignPayment(res, type, level);
            await this.contractRepository.persist(contract);
        }
    }
};
exports.WebhookStripeData = WebhookStripeData;
exports.WebhookStripeData = WebhookStripeData = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)(inject_tokens_1.STRIPE_SERVICE)),
    tslib_1.__param(1, (0, common_1.Inject)(inject_tokens_1.CONTRACT_REPOSITORY)),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof stripe_service_interface_1.IStripeService !== "undefined" && stripe_service_interface_1.IStripeService) === "function" ? _a : Object, typeof (_b = typeof contrac_repository_interface_1.IContractRepository !== "undefined" && contrac_repository_interface_1.IContractRepository) === "function" ? _b : Object])
], WebhookStripeData);


/***/ }),
/* 179 */
/***/ ((module) => {

module.exports = require("express");

/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const config_1 = __webpack_require__(4);
const swagger_1 = __webpack_require__(5);
const bodyParser = tslib_1.__importStar(__webpack_require__(6));
const main_module_1 = __webpack_require__(7);
async function bootstrap() {
    const app = await core_1.NestFactory.create(main_module_1.MainModule);
    const configService = app.get(config_1.ConfigService);
    const { port } = configService.get('server');
    const globalPrefix = 'api';
    app.enableCors();
    app.use(bodyParser.json({
        verify: (req, _res, buf, encoding) => {
            if (req.headers['stripe-signature']) {
                const enc = encoding;
                req.rawBody = buf.toString(enc || 'utf8');
            }
        },
    }));
    app.use(bodyParser.json());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.setGlobalPrefix(globalPrefix);
    const config = new swagger_1.DocumentBuilder()
        .setTitle('IFashion')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'JWT')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/documentation', app, document);
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

module.exports = __webpack_exports__;
/******/ })()
;