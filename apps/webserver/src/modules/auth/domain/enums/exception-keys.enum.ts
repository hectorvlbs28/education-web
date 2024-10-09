export enum AuthErrorKeys {
  UNAUTHORIZED = 'auth.unauthorized',
  FORBIDDEN_RESOURCE = 'auth.forbidden_resource',
  EXPIRED_TOKEN = 'auth.expired_token',
  INVALID_SIGNATURE = 'auth.invalid_signature',
  REVOKED_TOKEN = 'auth.revoked_token',
  MALFORMED_TOKEN = 'auth.malformed_token',
  INVALID_OTP = 'auth.invalid_otp',
  NO_OTP_SESSION = 'auth.otp_session_not_found',
  EXPIRED_OTP = 'auth.expired_otp',
  DISABLED_OTP = 'auth.disabled_otp',
}
