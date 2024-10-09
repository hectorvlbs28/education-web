import { Injectable } from '@nestjs/common';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { Role } from '../../domain/entities/roles';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { DataSource } from 'typeorm';
import { RoleEntity } from '../../../core/infrastruture/entities/role.entity';

@Injectable()
export class RoleRepository
  extends BaseRepository<Role>
  implements IRoleRepository<Role>
{
  private readonly aliasName = 'role';
  protected readonly entityPrefix = 'ROL';
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

  public async persist(entity: Role): Promise<Role> {
    const ormEntity = new RoleEntity(entity);
    ormEntity.updatedAt = new Date();
    await this.manager.save(ormEntity);
    return entity;
  }

  public async softDeleteRole(id: string): Promise<boolean> {
    const entity = await this.manager
      .createQueryBuilder(RoleEntity, this.aliasName)
      .softDelete()
      .where(`id = :id`, { id })
      .execute();
    if (entity.affected > 0) {
      return true;
    }

    return false;
  }
}
