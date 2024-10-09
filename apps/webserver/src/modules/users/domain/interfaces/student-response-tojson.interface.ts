import { IResponseToJsonAddress } from './payload-address-domain.interface';
import { IResponseCourseToJson } from './payload-course-create-domain.interface';

export interface IStudentReponseToJson {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  curp: string;
  lastDegreeStudy: string;
  phone: string;
  addresses: IResponseToJsonAddress[];
  nationality: string;
  younger: boolean;
  fatherFullName?: string;
  birthDate: Date;
  studyModality: string;
  courses?: IResponseCourseToJson[];
  createdAt: Date;
}
