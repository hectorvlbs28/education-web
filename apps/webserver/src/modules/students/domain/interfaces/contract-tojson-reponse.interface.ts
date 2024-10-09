import { StatusCourseEnum } from '../enums/status-course.enum';
import { IMonthlyPayment } from './monthly-payment.interface';
import { IResponseCourseToJson } from './payload-course-create-domain.interface';

export interface IContractToJsonResponse {
  id: string;
  studentsNanme: string;
  schoolName: string;
  dateBirthStudent: Date;
  curp?: string;
  studentPhone: string;
  scholarship: string;
  startDateService: Date;
  modality: string;
  annualRegistration: string;
  payment_annual_id?: string;
  monthlyPayments: IMonthlyPayment[];
  activatedContract: boolean;
  course: IResponseCourseToJson;
  documentId?: string;
  signature?: boolean;
  discount?: number;
  status: StatusCourseEnum;
  createdAt: Date;
}
