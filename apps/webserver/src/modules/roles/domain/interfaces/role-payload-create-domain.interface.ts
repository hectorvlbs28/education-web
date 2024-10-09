import { StatusRole } from '../../../core/domain/enums/status-role.enum';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { Permission } from '../entities/permission';

export interface IRolePayloadCreateDomain {
  id: Identifier;
  name: string;
  description: string;
  status: StatusRole;
  permissions: Permission[];
}
