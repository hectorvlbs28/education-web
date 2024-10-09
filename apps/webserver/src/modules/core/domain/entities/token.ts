import { TokenStatus } from '../../../core/domain/enums/token-status.enum';
import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { ITokenResponseToJson } from '../interfaces/token-response-tojson.interface';

export class Token {
  private _id: number;
  private _token: string;
  private _type: TokenTypes;
  private _status: TokenStatus;
  private _expires: Date;
  private _createdAt: Date;
  private _updatedAt: Date;

  private constructor() {}

  public static create(
    tokenValue: string,
    type: TokenTypes,
    ttl: number
  ): Token {
    const token = new Token();
    token._token = tokenValue;
    token._type = type;

    token._createdAt = new Date();
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + ttl / 60);
    token._expires = expiration;
    token._status = TokenStatus.ACTIVE;
    return token;
  }
  public static hydrate(root: any): Token {
    const token = new Token();
    token._id = root.id;
    token._token = root.token;
    token._type = root.type;
    token._status = root.status;
    token._expires = root.expiration;
    token._createdAt = root.createdAt;
    token._updatedAt = root.updatedAt;

    return token;
  }

  public toJSON(): ITokenResponseToJson {
    return {
      id: this._id,
      value: this._token,
      status: this._status,
      type: this._type,
      expiration: this._expires,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }

  public get id() {
    return this._id;
  }
  public get value() {
    return this._token;
  }

  public get ttl() {
    return (this._expires.getTime() - this._createdAt.getTime()) / 1000;
  }

  public revoke(): void {
    if (this._status === TokenStatus.ACTIVE) {
      this._status = TokenStatus.REVOKED;
      this._updatedAt = new Date();
    }
  }
  public expire(): void {
    if (this._status === TokenStatus.ACTIVE) {
      this._status = TokenStatus.EXPIRED;
      this._updatedAt = new Date();
    }
  }

  public isExpired(): boolean {
    return new Date() >= this._expires && this._status === TokenStatus.ACTIVE;
  }
  public isAlive(type: TokenTypes): boolean {
    return (
      this._type === type &&
      this._status === TokenStatus.ACTIVE &&
      this._expires > new Date()
    );
  }
}
