import { Entity } from '../../../core/domain/entities/domain-entity';
import { StatusRole } from '../../../core/domain/enums/status-role.enum';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IResponseRoleToJson } from '../interfaces/response-role-tojson.interface';
import { Permission } from './permission';

export class Role extends Entity {
  private _name: string;
  private _description: string;
  private _status: StatusRole;
  private _permissions: Permission[];

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IResponseRoleToJson {
    return {
      id: this.id.toString(),
      name: this._name,
      description: this._description,
      status: this._status,
      permissions:
        this._permissions && this._permissions.map((pe) => pe.toJSON()),
      createdAt: this._createdAt,
    };
  }

  static hydrate(root: any): Role {
    const role = new Role(new Identifier(root.id));
    role._name = root.name;
    role._description = root.description;
    role._status = root.status;
    role._permissions =
      root.permissions && root.permissions.map((pe) => Permission.hydrate(pe));
    role._createdAt = root.createdAt;
    return role;
  }
}
