import { TokenStatus } from '../enums/token-status.enum';
import { TokenTypes } from '../enums/token-types.enum';

export interface ITokenResponseToJson {
  id: number;
  value: string;
  type: TokenTypes;
  status: TokenStatus;
  expiration: Date;
  createdAt: Date;
  updatedAt: Date;
}
