import { TokensErrorKeys } from '../../domain/enums/exception-keys.enum';

export const TOKENS_ERRORS = {
  [TokensErrorKeys.USER_NOT_FOUND]: {
    message: 'User not found',
    httpStatusCode: 404,
  },
};
