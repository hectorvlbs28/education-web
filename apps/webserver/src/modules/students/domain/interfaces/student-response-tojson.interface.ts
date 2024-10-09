import { IAttachmentToJson } from './attachment.interface';
import { IContractToJsonResponse } from './contract-tojson-reponse.interface';
import { IResponseToJsonAddress } from './payload-address-domain.interface';
import { IResponseCourseToJson } from './payload-course-create-domain.interface';
import { IUserResponseToJson } from './user-response-tojson';

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
  user?: IUserResponseToJson;
  contract?: IContractToJsonResponse;
  courses?: IResponseCourseToJson[];
  attachments?: IAttachmentToJson[];
  avatar?: string;
  createdAt: Date;
}
