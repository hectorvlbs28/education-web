import { IContractToJsonResponse } from './contract-tojson-reponse.interface';

export interface IResponseCourseToJson {
  id: string;
  name: string;
  description: string;
  contract?: IContractToJsonResponse;
  createdAt: Date;
}
