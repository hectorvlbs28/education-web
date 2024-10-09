import { Module } from '@nestjs/common';
import { tokenGenerateFactory } from './infrastructure/constants/custom-providers';
import { GenerateToken } from './application/use-case/generate-token';
import { SessionTokenGenerator } from './infrastructure/strategies/session-token';
import { CoreModule } from '../core/core.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenGenerator } from './infrastructure/strategies/refresh-token';

@Module({
  exports: [GenerateToken, tokenGenerateFactory],
  imports: [
    CoreModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('application').secret,
        signOptions: { expiresIn: config.get('application').expiration },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    tokenGenerateFactory,
    GenerateToken,
    SessionTokenGenerator,
    RefreshTokenGenerator,
  ],
})
export class TokenModule {}
