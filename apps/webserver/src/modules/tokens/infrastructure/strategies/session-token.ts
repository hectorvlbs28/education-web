import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Token } from '../../../core/domain/entities/token';
import { TokenTypes } from '../../../core/domain/enums/token-types.enum';

import { ITokenGenerator } from '../../domain/interfaces/token-generator.interface';
import { IUserPayload } from '../../domain/interfaces/user-payload.interface';
import { ApplicationConfigType } from '../../../config/types/application.type';

@Injectable()
export class SessionTokenGenerator implements ITokenGenerator {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService
  ) {}
  generate(user: IUserPayload): Token {
    const { id, email, name, roles } = user;
    const payload = {
      user: {
        id,
        email,
        name,
        roles,
      },
    };

    return Token.create(
      this.jwtService.sign(payload),
      TokenTypes.SESSION,
      this.config.get<ApplicationConfigType>('application').expiration
    );
  }
}
