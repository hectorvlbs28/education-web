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
  monthlyPayments: IMonthlyPayment[];
  activatedContract: boolean;
  course: IResponseCourseToJson;
  discount?: number;
  documentId?: string;
  signature?: boolean;
  createdAt: Date;
}
