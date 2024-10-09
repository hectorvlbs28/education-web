import { StatusRole } from '../enums/status-role.enum';
import { IResponseToJsonPermission } from './response.tojson-permission.interface';

export interface IResponseRoleToJson {
  id: string;
  name: string;
  description: string;
  status: StatusRole;
  permissions?: IResponseToJsonPermission[];
  createdAt: Date;
}
