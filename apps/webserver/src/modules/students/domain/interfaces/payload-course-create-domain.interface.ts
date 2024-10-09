import { CourseCategoryEnum } from '../../../core/domain/enums/course-category.enum';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { StatusCourseEnum } from '../enums/status-course.enum';
import { IAttachmentToJson } from './attachment.interface';
import { IContractToJsonResponse } from './contract-tojson-reponse.interface';
import { IMonthlyPayment } from './monthly-payment.interface';
import { IStartDate } from './start-dates-interface';

export interface IPayloadCourseCreateDomain {
  id: Identifier;
  name: string;
  description: string;
}

export interface IResponseCourseToJson {
  id: string;
  name: string;
  description: string;
  registration: number;
  monthlyPayments: IMonthlyPayment[];
  startDate: IStartDate[];
  contracts?: IContractToJsonResponse[];
  attachments?: IAttachmentToJson[];
  courseCategory: CourseCategoryEnum;
  createdAt: Date;
}
