import { TokenGeneratorFactory } from '../../application/factories/token-generator-factory';
import { TOKEN_GENERATE_FACTORY } from './inject-tokens';

export const tokenGenerateFactory = {
  provide: TOKEN_GENERATE_FACTORY,
  useClass: TokenGeneratorFactory,
};
