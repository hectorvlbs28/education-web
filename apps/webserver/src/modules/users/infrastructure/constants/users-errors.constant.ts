import { UserErrorKeys } from '../../domain/enums/exception-keys.enum';

export const USER_ERRORS = {
  [UserErrorKeys.UNAUTHORIZED]: {
    message: 'Unauthorized',
    httpStatusCode: 401,
  },
  [UserErrorKeys.USER_NOT_FOUND]: {
    message: 'User not found',
    httpStatusCode: 404,
  },
  [UserErrorKeys.USER_EXIST]: {
    message: 'User already exists',
    httpStatusCode: 409,
  },
  [UserErrorKeys.USER_ROLE_EXIST]: {
    message: 'User has role assigned',
    httpStatusCode: 409,
  },
  [UserErrorKeys.USER_EMAIL_EXIST]: {
    message: 'Email used by another user',
    httpStatusCode: 409,
  },
  [UserErrorKeys.USER_NOT_ACTIVE]: {
    message: 'User Not Active',
    httpStatusCode: 401,
  },
};
