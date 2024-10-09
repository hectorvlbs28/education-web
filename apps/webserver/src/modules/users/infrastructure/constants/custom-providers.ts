import { RoleRepository } from '../repositories/role.repository';
import { UserRepository } from '../repositories/user.repository';
import { ROLE_REPOSITORY, USER_REPOSITORY } from './inject-tokens';

export const userRepository = {
  provide: USER_REPOSITORY,
  useClass: UserRepository,
};

export const roleRepository = {
  provide: ROLE_REPOSITORY,
  useClass: RoleRepository,
};
