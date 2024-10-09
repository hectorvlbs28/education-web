import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { JwtExceptionMapper } from '../../application/mappers/jwt-exception.mapper';
import { AuthErrorKeys } from '../../domain/enums/exception-keys.enum';
import { UnauthorizedException } from '../../domain/exceptions/unauthorized.exception';
import { ValidateTypeToken } from '../../application/use-case/validate-token';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly jwtExceptionMapper: JwtExceptionMapper,
    private readonly validateTypeToken: ValidateTypeToken
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const pathRequest = request.url;

      const token = request.headers['authorization']?.replace(/Bearer\s/, '');
      const tokenData = await this.jwtService.verify(token);

      // if (pathRequest === '/api/auth/update-password') {
      //   const { user: userValidate, tokenActive } =
      //     await this.validateTypeToken.process({
      //       email: tokenData.user.email,
      //       typeToken: TokenTypes.RECOVERY_PASSWORD,
      //     });
      //   if (tokenActive !== token) {
      //     throw new UnauthorizedException(AuthErrorKeys.UNAUTHORIZED);
      //   }
      //   request.user = userValidate;
      //   return true;
      // }

      if (!tokenData) {
        throw new UnauthorizedException(AuthErrorKeys.UNAUTHORIZED);
      }

      request.user = tokenData.user;

      return true;
    } catch (error) {
      throw this.jwtExceptionMapper.map(error);
    }
  }
}
