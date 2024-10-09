import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from '../../application/use-case/create-user';
import { UserCreatePayloadDto } from '../dto/user-create-payload.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginGuard } from '../../../auth/infrastructure/guards/login.guard';
import { UserProfile } from '../../application/use-case/user-profile';
import { UserRoleAssign } from '../../application/use-case/user-role-assign';
import { UserRoleAssignDto } from '../dto/user-role-assign.dto';
import { Roles } from '../../../core/infrastruture/decorators/get-role.decorator';
import { RolesGuard } from '../../../auth/infrastructure/guards/roles.guard';
import { RoleEnum } from '../../../core/domain/enums/roles.enum';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly userProfile: UserProfile,
    private readonly userRoleAssign: UserRoleAssign
  ) {}

  @Post('/signup')
  public async create(@Body() payload: UserCreatePayloadDto) {
    return this.createUser.process(payload);
  }

  @ApiBearerAuth('JWT')
  @Get('/me')
  @UseGuards(LoginGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN, RoleEnum.ADMIN, RoleEnum.STUDENT)
  public async getUserProfile(@Req() request: Request) {
    const token = request.headers['authorization']?.replace(/Bearer\s/, '');
    return await this.userProfile.process(token);
  }

  @ApiBearerAuth('JWT')
  @Put('/role/assign')
  @UseGuards(LoginGuard, RolesGuard)
  @Roles(RoleEnum.SUPER_ADMIN)
  public async assignRole(@Body() payload: UserRoleAssignDto) {
    return this.userRoleAssign.process(payload);
  }
}
