import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IPayloadCreatePermission } from '../interfaces/payload-create-permission.interface';
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

  static create(payload: IPayloadCreatePermission): Permission {
    const permission = new Permission();
    permission._name = payload.name;
    permission._description = payload.description;
    return permission;
  }

  static hydrate(root: Partial<IResponseToJsonPermission>): Permission {
    const permission = new Permission(new Identifier(root.id));
    permission._name = root.name;
    permission._description = root.description && root.description;
    return permission;
  }
}
