import { IResponseRoleToJson } from './response-role-tojson.interface';
import { IStudentReponseToJson } from './student-response-tojson.interface';

export interface IUserResponseToJson {
  id: string;
  name: string;
  email: string;
  password: string;
  students?: IStudentReponseToJson[];
  roles?: IResponseRoleToJson[];
  createdAt: Date;
}
