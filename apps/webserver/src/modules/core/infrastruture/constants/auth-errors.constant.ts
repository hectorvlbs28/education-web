import { AuthErrorKeys } from '../../../auth/domain/enums/exception-keys.enum';

export const AUTH_ERRORS = {
  [AuthErrorKeys.EXPIRED_TOKEN]: {
    message: 'The token has expired',
    httpStatusCode: 401,
  },
  [AuthErrorKeys.INVALID_SIGNATURE]: {
    message: 'The token signature is invalid',
    httpStatusCode: 401,
  },
  [AuthErrorKeys.MALFORMED_TOKEN]: {
    message: 'Malformed Token',
    httpStatusCode: 401,
  },
  [AuthErrorKeys.UNAUTHORIZED]: {
    message: 'Unauthorized',
    httpStatusCode: 401,
  },
  [AuthErrorKeys.REVOKED_TOKEN]: {
    message: 'The token has been revoked',
    httpStatusCode: 401,
  },
  [AuthErrorKeys.INVALID_OTP]: {
    message: 'Invalid OTP',
    httpStatusCode: 401,
  },
  [AuthErrorKeys.EXPIRED_OTP]: {
    message: 'Expired OTP',
    httpStatusCode: 401,
  },
  [AuthErrorKeys.FORBIDDEN_RESOURCE]: {
    message: "You can't have the required role to access this resource",
    httpStatusCode: 403,
  },
  [AuthErrorKeys.NO_OTP_SESSION]: {
    message: "You don't have an OTP session active",
    httpStatusCode: 404,
  },
  [AuthErrorKeys.DISABLED_OTP]: {
    message: 'This feature is disabled',
    httpStatusCode: 403,
  },
};
