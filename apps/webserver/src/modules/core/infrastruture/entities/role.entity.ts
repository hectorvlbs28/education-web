import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { CoreORMEntity } from './core-orm.entity';
import { StatusRole } from '../../domain/enums/status-role.enum';
import { PermissionEntity } from './permission.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends CoreORMEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'description' })
  description: string;

  @Column({ type: 'enum', enum: StatusRole, name: 'status' })
  status: StatusRole;

  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' },
  })
  permissions: PermissionEntity[];

  @ManyToMany(() => UserEntity, (user) => user.roles, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  users: UserEntity[];

  constructor(aggregate: any) {
    super();

    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));
      Object.assign(this, parsedEntity);
      if (parsedEntity.permissions) {
        this.permissions = parsedEntity.permissions.map(
          (p) => new PermissionEntity(p)
        );
      }
    }
  }
}
