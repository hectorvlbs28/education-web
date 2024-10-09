import { AggregateRoot } from '../../../core/domain/entities/aggregate-root';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IUserResponseToJson } from '../interfaces/user-response-tojson';
import { IUserResponseTransform } from '../interfaces/user-response-transform.interface';

export class User extends AggregateRoot {
  private _name: string;
  private _email: string;
  private _password: string;

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IUserResponseToJson {
    return {
      id: this.id.toString(),
      name: this._name,
      email: this._email,
      password: this._password,
      createdAt: this._createdAt,
    };
  }

  public transformResponse(): IUserResponseTransform {
    return {
      id: this.id.toString(),
      name: this._name,
      email: this._email,
      createdAt: this._createdAt,
    };
  }

  public get password(): string {
    return this._password;
  }

  static hydrate(root: any) {
    const user = new User(new Identifier(root.id));
    user._name = root.name;
    user._email = root.email;
    user._password = root.password;
    return user;
  }
}
