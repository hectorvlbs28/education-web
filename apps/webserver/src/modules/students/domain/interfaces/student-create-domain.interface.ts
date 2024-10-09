import { Email } from '../../../core/domain/value-objects/email';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { Address } from '../entities/address';
import { Course } from '../entities/course';

export interface IStudentCreateDomain {
  id: Identifier;
  fullName: string;
  email: Email;
  gender: string;
  curp: string;
  lastDegreeStudy: string;
  phone: string;
  addresses: Address[];
  nationality: string;
  younger: boolean;
  fatherFullName?: string;
  birthDate: Date;
  studyModality: string;
  courses: Course[];
}
