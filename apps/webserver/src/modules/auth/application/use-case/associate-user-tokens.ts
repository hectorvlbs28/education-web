import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { TokenTypes } from '../../../core/domain/enums/token-types.enum';

import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user';
import { USER_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { GenerateToken } from '../../../tokens/application/use-case/generate-token';
import { LoggedInUser } from '../../domain/interfaces/logger-in-user.interface';

@Injectable()
export class AssociateUserTokens {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>,
    private readonly generateToken: GenerateToken
  ) {}

  async process(user: User): Promise<LoggedInUser> {
    const accessToken = await this.generateToken.process({
      user: user.toJSON(),
      tokenType: TokenTypes.SESSION,
    });

    const refreshToken = await this.generateToken.process({
      user: user.toJSON(),
      tokenType: TokenTypes.REFRESH,
    });

    user.addRefreshToken(refreshToken);

    await this.userRepository.persist(user);

    return {
      userId: user.id.toString(),
      accessToken: accessToken.value,
      refreshToken: refreshToken.value,
    };
  }
}
