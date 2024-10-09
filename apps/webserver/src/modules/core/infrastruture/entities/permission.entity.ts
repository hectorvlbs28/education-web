import { Column, Entity, ManyToMany } from 'typeorm';
import { CoreORMEntity } from './core-orm.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'permissions' })
export class PermissionEntity extends CoreORMEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'description' })
  description: string;

  @ManyToMany(() => RoleEntity, (rol) => rol.permissions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  roles: RoleEntity[];

  constructor(aggregate: any) {
    super();

    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));

      Object.assign(this, parsedEntity);
    }
  }
}
