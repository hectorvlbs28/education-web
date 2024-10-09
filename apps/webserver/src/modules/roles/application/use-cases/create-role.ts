import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import {
  PERMISSION_REPOSITORY,
  ROLE_REPOSITORY,
} from '../../infrastructure/constants/inject-tokens';
import { IRoleRepository } from '../../domain/interfaces/role-repository.interface';
import { ICreateRolePayloadUseCase } from '../../domain/interfaces/create-role-use-case.interface';
import { IPermissionRepository } from '../../domain/interfaces/permission-repository.interface';
import { Permission } from '../../domain/entities/permission';
import { Role } from '../../domain/entities/roles';
import { StatusRole } from '../../../core/domain/enums/status-role.enum';

@Injectable()
export class CreateRole implements IUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepository: IRoleRepository<Role>,
    @Inject(PERMISSION_REPOSITORY)
    private readonly permissionRepository: IPermissionRepository<Permission>
  ) {}

  public async process(payload: ICreateRolePayloadUseCase): Promise<Role> {
    const { permissionIds, description, name } = payload;
    const permissions = await this.permissionRepository.findByIds(
      permissionIds
    );
    const role = Role.create({
      description,
      name,
      status: StatusRole.ACTIVED,
      id: this.roleRepository.nextId(),
      permissions,
    });
    return this.roleRepository.persist(role);
  }
}
