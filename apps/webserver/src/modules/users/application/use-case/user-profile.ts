import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { JwtService } from '@nestjs/jwt';
import { USER_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IUserRepository } from '../../domain/interfaces/user-repository';
import { User } from '../../domain/entities/user';

@Injectable()
export class UserProfile implements IUseCase {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>
  ) {}

  public async process(command: string): Promise<any> {
    const tokenData = await this.jwtService.verify(command);
    const user = await this.userRepository.findById(tokenData.user.id);
    return user.transformResponse();
  }
}
