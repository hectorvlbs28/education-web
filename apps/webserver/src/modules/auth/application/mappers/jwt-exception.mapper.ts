import { Injectable } from '@nestjs/common';

import { AuthErrorKeys } from '../../domain/enums/exception-keys.enum';
import { ExpiredTokenException } from '../../domain/exceptions/expired-token.exception';
import { InvalidSignatureException } from '../../domain/exceptions/invalid-signature.exception';
import { MalformedTokenException } from '../../domain/exceptions/malformed-token.exception';
import { UnauthorizedException } from '../../domain/exceptions/unauthorized.exception';

@Injectable()
export class JwtExceptionMapper {
  public map(error: Error): Error {
    if (error.message === 'jwt expired') {
      return new ExpiredTokenException(AuthErrorKeys.EXPIRED_TOKEN);
    }
    if (error.message === 'invalid signature') {
      return new InvalidSignatureException(AuthErrorKeys.INVALID_SIGNATURE);
    }
    if (error.message === 'jwt must be provided') {
      return new UnauthorizedException(AuthErrorKeys.UNAUTHORIZED);
    }
    if (
      error.message === 'jwt malformed' ||
      error.message === 'invalid token' ||
      error.message.includes('in JSON')
    ) {
      return new MalformedTokenException(AuthErrorKeys.MALFORMED_TOKEN);
    }

    return error;
  }
}
