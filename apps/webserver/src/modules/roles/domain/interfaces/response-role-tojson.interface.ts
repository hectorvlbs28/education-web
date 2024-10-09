import { IResponseToJsonPermission } from './response.tojson-permission.interface';
import { StatusRole } from '../../../core/domain/enums/status-role.enum';

export interface IResponseRoleToJson {
  id: string;
  name: string;
  description: string;
  status: StatusRole;
  permissions?: IResponseToJsonPermission[];
  createdAt: Date;
}
