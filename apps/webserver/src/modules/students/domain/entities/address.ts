import { Entity } from '../../../core/domain/entities/domain-entity';
import { Identifier } from '../../../core/domain/value-objects/identifier';
import {
  IPayloadCreateAddressDomain,
  IResponseToJsonAddress,
} from '../interfaces/payload-address-domain.interface';

export class Address extends Entity {
  private _zipCode: number;
  private _city: string;
  private _state: string;
  private _country: string;
  private _streetName: string;

  private constructor(id: Identifier) {
    super(id);
  }

  public toJSON(): IResponseToJsonAddress {
    return {
      id: this.id && Number(this.id.toString()),
      city: this._city,
      country: this._country,
      streetName: this._streetName,
      createdAt: this._createdAt,
      state: this._state,
      zipCode: this._zipCode,
    };
  }

  static create(payload: IPayloadCreateAddressDomain): Address {
    const address = new Address(new Identifier(payload.id));

    address._city = payload.city;
    address._country = payload.country;
    address._state = payload.state;
    address._zipCode = payload.zipCode;
    address._streetName = payload.streetName;

    return address;
  }

  static hydrate(root: Partial<IResponseToJsonAddress>): Address {
    const address = new Address(new Identifier(root.id));
    address._city = root.city;
    address._country = root.country;
    address._state = root.state;
    address._zipCode = root.zipCode;
    address._streetName = root.streetName;
    address._createdAt = root.createdAt;
    return address;
  }
}
