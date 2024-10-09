export interface IPayloadCreateAddressDomain {
  id?: number;
  zipCode: number;
  city: string;
  state: string;
  streetName: string;
  country: string;
}

export interface IResponseToJsonAddress {
  id: number;
  zipCode: number;
  city: string;
  state: string;
  country: string;
  streetName: string;
  createdAt: Date;
}
