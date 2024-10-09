import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import {
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '../../infrastructure/constants/inject-tokens';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/roles';
import { IUserRepository } from '../../domain/interfaces/user-repository';
import { User } from '../../domain/entities/user';
import { IPayloadRoleAssign } from '../../domain/interfaces/payload-role-assign.interface';

@Injectable()
export class UserRoleAssign implements IUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository<Role>,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>
  ) {}

  public async process(payload: IPayloadRoleAssign): Promise<User> {
    const { roleId, userId } = payload;
    const role = await this.roleRepository.findById(roleId);
    const user = await this.userRepository.findById(userId);
    user.assignRole(role);
    return this.userRepository.persist(user);
  }
}
