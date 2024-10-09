import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../domain/interfaces/user-repository.interface';
import { User } from '../../domain/entities/user';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { DataSource } from 'typeorm';
import { UserEntity } from '../../../core/infrastruture/entities/user.entity';

@Injectable()
export class UserRepository
  extends BaseRepository<User>
  implements IUserRepository<User>
{
  private readonly aliasName = 'user';
  constructor(private readonly dataSource: DataSource) {
    super(User, dataSource);
  }

  public async findById(id: string): Promise<User> {
    const entity = await this.manager
      .createQueryBuilder(UserEntity, this.aliasName)
      .leftJoinAndSelect(`${this.aliasName}.tokens`, 'tokens')
      .where(`${this.aliasName}.id = :id`, { id: id })
      .getOne();

    return entity && User.hydrate(entity);
  }

  public async persist(entity: User): Promise<User> {
    const ormEntity = new UserEntity(entity);
    ormEntity.updatedAt = new Date();
    await this.manager.save(ormEntity);
    return entity;
  }
}
