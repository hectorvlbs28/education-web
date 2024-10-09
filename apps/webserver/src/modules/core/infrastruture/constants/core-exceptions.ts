import { CoreErrorKeys } from '../../domain/enums/exception-keys.enum';

export const CORE_ERRORS = {
  [CoreErrorKeys.INVALID_EMAIL]: {
    message: 'Invalid Email',
    httpStatusCode: 409,
  },
};
