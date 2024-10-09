import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { IPermissionRepository } from '../../domain/interfaces/permission-repository.interface';
import { Permission } from '../../domain/entities/permission';
import { BaseRepository } from '../../../core/infrastruture/repositories/base-repository';
import { PermissionEntity } from '../../../core/infrastruture/entities/permission.entity';

@Injectable()
export class PermissionRepository
  extends BaseRepository<Permission>
  implements Omit<IPermissionRepository<Permission>, 'findById'>
{
  private readonly aliasName = 'permission';

  constructor(private readonly dataSource: DataSource) {
    super(Permission, dataSource);
  }

  public async persist(entity: Permission): Promise<Permission> {
    const ormEntity = new PermissionEntity(entity);
    ormEntity.updatedAt = new Date();
    await this.manager.save(ormEntity);
    return entity;
  }

  public async findByIds(ids: string[]): Promise<Permission[]> {
    const entities = await this.manager
      .createQueryBuilder(PermissionEntity, this.aliasName)
      .where(`${this.aliasName}.id IN (:...ids)`, { ids })
      .getMany();
    return entities && entities.map((entity) => Permission.hydrate(entity));
  }
}
