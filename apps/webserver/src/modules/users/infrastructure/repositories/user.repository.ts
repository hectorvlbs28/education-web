import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';

import { User } from '../../domain/entities/user';

import { IUserRepository } from '../../domain/interfaces/user-repository';
import { UserNotFoundException } from '../../domain/exceptions/user-not-found.exception';
import { UserErrorKeys } from '../../domain/enums/exception-keys.enum';
import { UserEntity } from '../../../core/infrastruture/entities/user.entity';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository<User>
{
  private aliasName: string = 'user';
  protected readonly entityPrefix = 'USR';
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource);
  }

  public async findByEmail(email: string): Promise<User> {
    const entity = await this.manager
      .createQueryBuilder(UserEntity, this.aliasName)
      .where(`${this.aliasName}.email = :email`, { email })
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

  public async persist(entity: User): Promise<User> {
    const ormEntity = new UserEntity(entity);
    ormEntity.updatedAt = new Date();
    await this.manager.save(ormEntity);
    return entity;
  }

  public async findById(id: string): Promise<User> {
    const entity = await this.manager
      .createQueryBuilder(UserEntity, this.aliasName)
      .leftJoinAndSelect(`${this.aliasName}.students`, 'students')
      .leftJoinAndSelect('students.courses', 'courses')
      .leftJoinAndSelect('students.addresses', 'addresses')
      .leftJoinAndSelect('courses.contracts', 'contracts')
      .leftJoinAndSelect(`${this.aliasName}.roles`, 'roles')
      .where(`${this.aliasName}.id = :id`, { id: id })
      .getOne();

    return entity && User.hydrate(entity);
  }

  public async softDeleteUser(id: string): Promise<boolean> {
    const entity = await this.manager
      .createQueryBuilder(UserEntity, this.aliasName)
      .softDelete()
      .where(`id = :id`, { id })
      .execute();
    if (entity.affected > 0) {
      return true;
    }

    return false;
  }
}
