import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import {
  ROLE_REPOSITORY,
  USER_REPOSITORY,
} from '../../infrastructure/constants/inject-tokens';
import { IUserRepository } from '../../domain/interfaces/user-repository';
import { User } from '../../domain/entities/user';
import { IUserCreateUseCasePayload } from '../../domain/interfaces/user-create-payload.interface';
import { UserExistException } from '../../domain/exceptions/user-exists.exception';
import { UserErrorKeys } from '../../domain/enums/exception-keys.enum';
import { HASHER } from '../../../core/infrastruture/constants/inject-tokens';
import { IHasher } from '../../domain/interfaces/hasher';
import { IUserResponseTransform } from '../../domain/interfaces/user-response-transform.interface';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/roles';

@Injectable()
export class CreateUser implements IUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository<User>,
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository<Role>,
    @Inject(HASHER)
    private readonly hasher: IHasher
  ) {}

  public async process(
    payload: IUserCreateUseCasePayload
  ): Promise<IUserResponseTransform> {
    const { email, name, password } = payload;
    const user = await this.userRepository.findByEmail(email);
    if (user) {
      throw new UserExistException(UserErrorKeys.USER_EXIST);
    }
    const role = await this.roleRepository.findById(
      'ROL_2l4g5eHSvnULfjFh70JXOutf68I'
    );
    const passwordEncrypt = await this.hasher.encrypt(password);
    const newUser = User.create({
      id: this.userRepository.nextId(),
      email,
      name,
      password: passwordEncrypt,
      roles: [role],
    });
    const userSave = await this.userRepository.persist(newUser);
    return userSave.transformResponse();
  }
}
