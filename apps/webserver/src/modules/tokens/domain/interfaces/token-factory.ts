import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { ITokenGenerator } from './token-generator.interface';

export interface ITokenFactory {
  createTokenGenerator(tokenType: TokenTypes): ITokenGenerator;
}
