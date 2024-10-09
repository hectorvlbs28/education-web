import { AggregateRoot } from '../../../core/domain/entities/aggregate-root';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IUserCreatePayload } from '../interfaces/user-create-payload';
import { IUserResponseToJson } from '../interfaces/user-response-tojson';
import { IUserResponseTransform } from '../interfaces/user-response-transform.interface';
import { Role } from './roles';
import { Student } from './student';

export class User extends AggregateRoot {
  private _name: string;
  private _email: string;
  private _password: string;
  private _students: Student[];
  private _roles: Role[];

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IUserResponseToJson {
    return {
      id: this.id.toString(),
      name: this._name,
      email: this._email,
      password: this._password,
      students:
        this._students && this._students.map((student) => student.toJSON()),
      roles: this._roles && this._roles.map((role) => role.toJSON()),
      createdAt: this._createdAt,
    };
  }

  public transformResponse(): IUserResponseTransform {
    return {
      id: this.id.toString(),
      name: this._name,
      email: this._email,
      students: (this._students || []).map((student) => student.toJSON()),
      roles: this._roles && this._roles.map((role) => role.toJSON()),
      createdAt: this._createdAt,
    };
  }

  public get password(): string {
    return this._password;
  }

  public assignRole(role: Role): void {
    if (!this._roles || this._roles.length === 0) {
      this._roles = [];
      this._roles.push(role);
    }
  }

  static create(payload: IUserCreatePayload): User {
    const user = new User(payload.id);
    user._name = payload.name;
    user._email = payload.email;
    user._password = payload.password;
    user._roles = payload.roles;
    return user;
  }

  static hydrate(root: any) {
    const user = new User(new Identifier(root.id));
    user._name = root.name;
    user._email = root.email;
    user._password = root.password;
    user._students =
      root.students && root.students.map((student) => Student.hydrate(student));
    user._roles = root.roles && root.roles.map((role) => Role.hydrate(role));
    return user;
  }
}
