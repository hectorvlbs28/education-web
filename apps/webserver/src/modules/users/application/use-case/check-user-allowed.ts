import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { USER_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IUserRepository } from '../../domain/interfaces/user-repository';
import { User } from '../../domain/entities/user';
import { HASHER } from '../../../core/infrastruture/constants/inject-tokens';
import { IHasher } from '../../domain/interfaces/hasher';
import { IUserLoginPayload } from '../../domain/interfaces/user-login-payload.interface';
import { UserErrorKeys } from '../../domain/enums/exception-keys.enum';

@Injectable()
export class CheckUserAllowed implements IUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>,
    @Inject(HASHER)
    private readonly hasher: IHasher
  ) {}
  public async process(userDto: IUserLoginPayload): Promise<User> {
    const user = await this.userRepository.findByEmailOrFail(userDto.email);

    if (user && (await this.hasher.compare(userDto.password, user.password))) {
      return user;
    }

    throw new UnauthorizedException(UserErrorKeys.UNAUTHORIZED);
  }
}
