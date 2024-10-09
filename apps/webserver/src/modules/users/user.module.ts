import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  roleRepository,
  userRepository,
} from './infrastructure/constants/custom-providers';
import { CoreModule } from '../core/core.module';
import { CheckUserAllowed } from './application/use-case/check-user-allowed';
import { CreateUser } from './application/use-case/create-user';
import { UserController } from './infrastructure/controllers/user.controller';
import { AuthModule } from '../auth/auth.module';
import { UserProfile } from './application/use-case/user-profile';
import { UserRoleAssign } from './application/use-case/user-role-assign';

@Module({
  controllers: [UserController],
  exports: [CheckUserAllowed],
  imports: [CoreModule, forwardRef(() => AuthModule)],
  providers: [
    userRepository,
    CheckUserAllowed,
    CreateUser,
    UserProfile,
    roleRepository,
    UserRoleAssign,
  ],
})
export class UserModule {}
