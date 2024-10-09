import { Injectable } from '@nestjs/common';

import { TokenTypes } from '../../../core/domain/enums/token-types.enum';

import { ITokenGenerator } from '../../domain/interfaces/token-generator.interface';
import { ITokenFactory } from '../../domain/interfaces/token-factory';
import { SessionTokenGenerator } from '../../infrastructure/strategies/session-token';
import { RefreshTokenGenerator } from '../../infrastructure/strategies/refresh-token';

@Injectable()
export class TokenGeneratorFactory implements ITokenFactory {
  private strategies = new Map<string, ITokenGenerator>();

  constructor(
    private readonly session: SessionTokenGenerator,
    private readonly refresh: RefreshTokenGenerator
  ) {
    this.strategies.set(TokenTypes.SESSION, this.session);
    this.strategies.set(TokenTypes.REFRESH, this.refresh);
  }
  public createTokenGenerator(tokenType: TokenTypes): ITokenGenerator {
    this.assertThatTypeIsValid(tokenType);
    return this.strategies.get(tokenType);
  }

  private assertThatTypeIsValid(tokenType: TokenTypes) {
    if (!this.strategies.has(tokenType)) {
      throw new Error('');
    }
  }
}
