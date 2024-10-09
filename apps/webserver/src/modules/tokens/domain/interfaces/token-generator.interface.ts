import { Token } from '../../../core/domain/entities/token';

export interface ITokenGenerator {
  generate(data: any): Token;
}
