import { Injectable } from '@nestjs/common';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/roles';
import { DataSource } from 'typeorm';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { RoleEntity } from '../../../core/infrastruture/entities/role.entity';

@Injectable()
export class RoleRepository
  extends BaseRepository<Role>
  implements Omit<IRoleRepository<Role>, 'persist'>
{
  private readonly aliasName = 'role';
  constructor(private readonly dataSource: DataSource) {
    super(Role, dataSource);
  }

  public async findById(id: string): Promise<Role> {
    const entity = await this.manager
      .createQueryBuilder(RoleEntity, this.aliasName)
      .where(`${this.aliasName}.id = :id`, { id })
      .leftJoinAndSelect(`${this.aliasName}.permissions`, 'permissions')
      .getOne();
    return entity && Role.hydrate(entity);
  }
}
