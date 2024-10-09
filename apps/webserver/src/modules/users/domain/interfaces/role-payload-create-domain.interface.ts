import { Identifier } from '../../../core/domain/value-objects/identifier';
import { StatusRole } from '../enums/status-role.enum';

export interface IRolePayloadCreateDomain {
  id: Identifier;
  name: string;
  description: string;
  status: StatusRole;
}
