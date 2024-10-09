import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserErrorKeys } from '../../domain/enums/user-exception-keys.enum';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository<User>
{
  private readonly aliasName = 'user';

  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource);
  }
  public async persist(entity: User): Promise<User> {
    const ormEntity = new UserEntity(entity);
    ormEntity.updatedAt = new Date();
    await this.manager.save(ormEntity);
    return entity;
  }

  public async findById(id: string): Promise<User> {
    const entity = await this.manager
      .createQueryBuilder(UserEntity, 'user')
      .where('user.id = :id', { id })
      .getOne();
    return entity && User.hydrate(entity);
  }

  public async findByEmail(email: string): Promise<User> {
    const entity = await this.manager
      .createQueryBuilder(UserEntity, this.aliasName)
      .where(`LOWER(${this.aliasName}.email) = :email`, { email })
      .leftJoinAndSelect(`${this.aliasName}.tokens`, 'tokens')
      .leftJoinAndSelect(`${this.aliasName}.roles`, 'roles')
      .leftJoinAndSelect('roles.permissions', 'permissions')
      .getOne();
    return entity && User.hydrate(entity);
  }

  public async findByEmailOrFail(email: string): Promise<User> {
    const entity = await this.findByEmail(email);
    if (entity === undefined) {
      throw new UserNotFoundException(UserErrorKeys.USER_NOT_FOUND);
    }
    return entity;
  }
}
