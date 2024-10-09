import { RoleRepository } from '../repositories/role.repository';
import { PermissionRepository } from '../repositories/permission.repository';
import { PERMISSION_REPOSITORY, ROLE_REPOSITORY } from './inject-tokens';

export const roleRepository = {
  provide: ROLE_REPOSITORY,
  useClass: RoleRepository,
};

export const permissionRepository = {
  provide: PERMISSION_REPOSITORY,
  useClass: PermissionRepository,
};
