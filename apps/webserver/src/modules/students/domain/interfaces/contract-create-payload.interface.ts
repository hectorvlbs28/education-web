import { Identifier } from '../../../core/domain/value-objects/identifier';
import { Course } from '../entities/course';
import { Student } from '../entities/student';
import { IMonthlyPayment } from './monthly-payment.interface';

export interface IContractCreatePayload {
  id: Identifier;
  studentsNanme: string;
  schoolName: string;
  activatedContract: boolean;
  dateBirthStudent: Date;
  curp?: string;
  studentPhone: string;
  scholarship: string;
  startDateService: Date;
  modality: string;
  annualRegistration: string;
  monthlyPayments: IMonthlyPayment[];
  course?: Course;
}

export interface IContractCreateUseCase {
  studentId: string;
  courseId: string;
  studentsNanme: string;
  schoolName: string;
  dateBirthStudent: Date;
  curp?: string;
  studentPhone: string;
  scholarship: string;
  startDateService: Date;
  modality: string;
  annualRegistration: string;
  monthlyPayments?: IMonthlyPayment[];
}
