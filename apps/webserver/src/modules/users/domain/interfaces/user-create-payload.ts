import { Identifier } from '../../../core/domain/value-objects/identifier';
import { Role } from '../entities/roles';

export interface IUserCreatePayload {
  id: Identifier;
  name: string;
  email: string;
  password: string;
  roles: Role[];
}
