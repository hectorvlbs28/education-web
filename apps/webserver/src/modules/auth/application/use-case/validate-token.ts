import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../domain/entities/user';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { USER_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { IValidateToken } from '../../domain/interfaces/validate-token.interface';

@Injectable()
export class ValidateTypeToken implements IUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>
  ) {}
  async process(
    command: IValidateToken
  ): Promise<Omit<Record<string, any>, 'tokens'>> {
    const { email, typeToken } = command;
    const user = await this.userRepository.findByEmail(email);
    const tokenActive = user.getActiveToken(typeToken);

    return {
      user: user.removeTokens().toJSON(),
      tokenActive: tokenActive.toJSON().value,
    };
  }
}
