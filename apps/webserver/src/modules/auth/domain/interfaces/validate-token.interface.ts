import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { IValueObject } from '../../../core/domain/interfaces/value-object';

export interface IValidateToken extends IValueObject {
  email: string;
  typeToken: TokenTypes;
}
