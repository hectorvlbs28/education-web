import { Entity } from '../../../core/domain/entities/domain-entity';
import { CourseCategoryEnum } from '../../../core/domain/enums/course-category.enum';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { StatusCourseEnum } from '../enums/status-course.enum';
import { IMonthlyPayment } from '../interfaces/monthly-payment.interface';
import {
  IPayloadCourseCreateDomain,
  IResponseCourseToJson,
} from '../interfaces/payload-course-create-domain.interface';
import { IStartDate } from '../interfaces/start-dates-interface';
import { Attachment } from './attachment';
import { Contract } from './contract';

export class Course extends Entity {
  private _name: string;
  private _description: string;
  private _contracts: Contract[];
  private _attachments: Attachment[];
  private _registration: number;
  private _monthlyPayments: IMonthlyPayment[];
  private _startDate: IStartDate[];
  private _courseCategory: CourseCategoryEnum;

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IResponseCourseToJson {
    return {
      id: this.id.toString(),
      name: this._name,
      description: this._description,
      monthlyPayments: this._monthlyPayments,
      registration: this._registration,
      startDate: this._startDate,
      contracts:
        this._contracts && this._contracts.map((contract) => contract.toJSON()),
      attachments:
        this._attachments && this._attachments.map((att) => att.toJSON()),
      courseCategory: this._courseCategory,
      createdAt: this._createdAt,
    };
  }

  public get contracts(): Contract[] {
    return this._contracts;
  }

  public assignContract(contract: Contract) {
    if (!this._contracts) {
      this._contracts = [];
      this._contracts.push(contract);
    } else {
      this._contracts.push(contract);
    }
  }

  public assignAttachment(attachments: Attachment[]) {
    this._attachments = attachments;
  }

  public assignStatusContract(status: StatusCourseEnum) {
    this._contracts.forEach((contract) => {
      contract.assignStatus(status);
    });
  }

  static create(payload: IPayloadCourseCreateDomain): Course {
    const course = new Course(payload.id);
    course._name = payload.name;
    course._description = payload.description;
    return course;
  }

  static hydrate(root: any): Course {
    const course = new Course(new Identifier(root.id));
    course._name = root.name;
    course._description = root.description;
    course._monthlyPayments = root.monthlyPayments;
    course._registration = root.registration;
    course._startDate = root.startDate;
    course._createdAt = root.createdAt;
    course._contracts =
      root.contracts &&
      root.contracts.map((contract) => Contract.hydrate(contract));
    course._attachments =
      root.attachments &&
      root.attachments.map((att) => Attachment.hydrate(att));
    course._courseCategory = root.courseCategory;
    return course;
  }
}
