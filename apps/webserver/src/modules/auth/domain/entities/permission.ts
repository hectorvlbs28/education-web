import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IResponseToJsonPermission } from '../interfaces/response.tojson-permission.interface';

export class Permission extends Entity {
  private _name: string;
  private _description: string;

  private constructor(id?: Identifier) {
    super(id);
  }

  public toJSON(): IResponseToJsonPermission {
    return {
      id: this.id.toString(),
      name: this._name,
      description: this._description && this._description,
    };
  }

  static hydrate(root: any): Permission {
    const permission = new Permission(new Identifier(root.id));
    permission._name = root.name;
    permission._description = root.description && root.description;
    return permission;
  }
}
