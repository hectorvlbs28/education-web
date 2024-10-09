import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { CoreORMEntity } from './core-orm.entity';
import { TokenEntity } from './token.entity';
import { StudentEntity } from './student.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'users' })
export class UserEntity extends CoreORMEntity {
  @Column({ type: 'varchar', name: 'name' })
  name: string;

  @Column({ type: 'varchar', name: 'email' })
  email: string;

  @Column({ type: 'varchar', name: 'password' })
  password: string;

  @OneToMany(() => TokenEntity, (token) => token.user, {
    cascade: true,
    eager: true,
  })
  public tokens: TokenEntity[];

  @OneToMany(() => StudentEntity, (student) => student.user, {
    cascade: true,
    eager: true,
  })
  students: StudentEntity[];

  @ManyToMany(() => RoleEntity, (rol) => rol.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  constructor(aggregate: any) {
    super();
    if (aggregate) {
      const parsedEntity = JSON.parse(JSON.stringify(aggregate));
      Object.assign(this, parsedEntity);
      if (parsedEntity.tokens) {
        this.tokens = parsedEntity.tokens.map(
          (token) => new TokenEntity(token)
        );
      }
      if (parsedEntity.students) {
        this.students = parsedEntity.students.map(
          (student) => new StudentEntity(student)
        );
      }

      if (parsedEntity.roles) {
        this.roles = parsedEntity.roles.map((role) => new RoleEntity(role));
      }
    }
  }
}
