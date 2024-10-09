import { Global, Module, forwardRef } from '@nestjs/common';
import { JwtExceptionMapper } from './application/mappers/jwt-exception.mapper';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entities/user.entity';
import { userRepository } from './infrastructure/constants/custom-providers';
import { TokenModule } from '../tokens/token.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../users/user.module';
import { Login } from './application/use-case/login';
import { AssociateUserTokens } from './application/use-case/associate-user-tokens';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { LoginGuard } from './infrastructure/guards/login.guard';
import { ValidateTypeToken } from './application/use-case/validate-token';
import { RolesGuard } from './infrastructure/guards/roles.guard';

@Global()
@Module({
  controllers: [AuthController],
  exports: [
    JwtExceptionMapper,
    JwtModule,
    ValidateTypeToken,
    LoginGuard,
    RolesGuard,
  ],
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TokenModule,
    forwardRef(() => UserModule),
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
    AssociateUserTokens,
    JwtExceptionMapper,
    userRepository,
    Login,
    LoginGuard,
    RolesGuard,
    ValidateTypeToken,
  ],
})
export class AuthModule {}
