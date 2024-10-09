import { IMonthlyPayment } from './monthly-payment.interface';
import { IResponseCourseToJson } from './response-course-tojson.interface';

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
  paymentAnnualId?: string;
  monthlyPayments: IMonthlyPayment[];
  activatedContract: boolean;
  course: IResponseCourseToJson;
  documentId?: string;
  signature?: boolean;
  createdAt: Date;
}
