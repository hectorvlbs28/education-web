import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Token } from '../../../core/domain/entities/token';
import { TokenTypes } from '../../../core/domain/enums/token-types.enum';
import { ITokenGenerator } from '../../domain/interfaces/token-generator.interface';
import { IUserPayload } from '../../domain/interfaces/user-payload.interface';

@Injectable()
export class RefreshTokenGenerator implements ITokenGenerator {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}
  generate(user: IUserPayload): Token {
    const { id } = user;

    return Token.create(
      this.jwtService.sign(
        { id },
        {
          secret: this.config.get('application').refreshSecret,
          expiresIn: this.config.get('application').refreshExpiration,
        }
      ),
      TokenTypes.REFRESH,
      this.config.get('application').refreshExpiration
    );
  }
}
