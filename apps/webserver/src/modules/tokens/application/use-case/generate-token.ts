import { Inject, Injectable } from '@nestjs/common';

import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { Token } from '../../../core/domain/entities/token';

import { ITokenFactory } from '../../domain/interfaces/token-factory';
import { TOKEN_GENERATE_FACTORY } from '../../infrastructure/constants/inject-tokens';

@Injectable()
export class GenerateToken implements IUseCase {
  constructor(
    @Inject(TOKEN_GENERATE_FACTORY)
    private readonly tokenGeneratorFactory: ITokenFactory
  ) {}

  async process(command: GenerateTokenDto): Promise<Token> {
    const tokenStrategy = this.tokenGeneratorFactory.createTokenGenerator(
      command.tokenType
    );
    return tokenStrategy.generate(command.user);
  }
}

export class GenerateTokenDto {
  tokenType: TokenTypes;
  user: Record<string, any>;
}
