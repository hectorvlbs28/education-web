import { IResponseRoleToJson } from './response-role-tojson.interface';
import { IStudentReponseToJson } from './student-response-tojson.interface';

export interface IUserResponseTransform {
  id: string;
  name: string;
  email: string;
  students?: IStudentReponseToJson[];
  roles?: IResponseRoleToJson[];
  createdAt: Date;
}
