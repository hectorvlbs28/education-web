import { UserRepository } from '../repositories/user.repository';
import { USER_REPOSITORY } from './inject-tokens';

export const userRepository = {
  provide: USER_REPOSITORY,
  useClass: UserRepository,
};
