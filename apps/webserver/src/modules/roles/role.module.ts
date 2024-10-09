import { Module } from '@nestjs/common';
import {
  permissionRepository,
  roleRepository,
} from './infrastructure/constants/custom-providers';
import { CreateRole } from './application/use-cases/create-role';
import { AuthModule } from '../auth/auth.module';
import { RoleController } from './infrastructure/controllers/role.controller';

@Module({
  controllers: [RoleController],
  imports: [AuthModule],
  providers: [roleRepository, permissionRepository, CreateRole],
})
export class RoleModule {}
