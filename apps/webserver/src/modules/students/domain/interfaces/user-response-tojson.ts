import { IStudentReponseToJson } from './student-response-tojson.interface';

export interface IUserResponseToJson {
  id: string;
  name: string;
  email: string;
  password?: string;
  students?: IStudentReponseToJson[];
  createdAt: Date;
}
