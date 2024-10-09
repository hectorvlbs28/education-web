import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';

import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user';

import { AssociateUserTokens } from './associate-user-tokens';
import { USER_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IUserLoginPayload } from '../../domain/interfaces/user-login-payload.interface';
import { CheckUserAllowed } from '../../../users/application/use-case/check-user-allowed';

@Injectable()
export class Login implements IUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>,
    private readonly associateUserTokens: AssociateUserTokens,
    private readonly checkUserAllowed: CheckUserAllowed
  ) {}

  async process(command: IUserLoginPayload) {
    const user = await this.userRepository.findByEmail(command.email);
    await this.checkUserAllowed.process(command);

    return this.associateUserTokens.process(user);
  }
}
