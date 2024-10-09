import { Entity } from '../../../core/domain/entities/domain-entity';
import { Token } from '../../../core/domain/entities/token';
import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import { AuthErrorKeys } from '../enums/exception-keys.enum';
import { InvalidSignatureException } from '../exceptions/invalid-signature.exception';
import { IUserResponseToJson } from '../interfaces/user-response-tojson';
import { Role } from './roles';

export class User extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _roles: Role[];
  private _tokens: Token[];

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IUserResponseToJson {
    return {
      id: this.id.toString(),
      name: this._name,
      email: this._email,
      roles: this._roles && this._roles.map((role) => role.toJSON()),
      tokens: (this._tokens || []).map((token) => token.toJSON()),
      createdAt: this._createdAt,
    };
  }

  public getActiveToken(type: TokenTypes): Token {
    const token = this._tokens.find((token) => token.isAlive(type));
    if (!token) {
      if (type === TokenTypes.RECOVERY_PASSWORD) {
        throw new InvalidSignatureException(AuthErrorKeys.INVALID_SIGNATURE);
      }
    }
    return token;
  }

  public removeTokens(): User {
    this._tokens = [];
    return this;
  }

  public addRefreshToken(token: Token): Token {
    this.revokeAllActiveTokens();
    this._tokens.push(token);
    return token;
  }

  public revokeAllActiveTokens(): void {
    this._tokens.forEach((token) => token.revoke());
  }

  static hydrate(root: any) {
    const user = new User(new Identifier(root.id));
    user._name = root.name;
    user._email = root.email;
    user._roles = root.roles && root.roles.map((role) => Role.hydrate(role));
    user._password = root.password;
    user._tokens = (root.tokens || []).map((token) => Token.hydrate(token));
    return user;
  }
}
