import { ITokenResponseToJson } from '../../../core/domain/interfaces/token-response-tojson.interface';
import { IResponseRoleToJson } from './response-role-tojson.interface';

export interface IUserResponseToJson {
  id: string;
  name: string;
  email: string;
  roles: IResponseRoleToJson[];
  tokens: ITokenResponseToJson[];
  createdAt: Date;
}
