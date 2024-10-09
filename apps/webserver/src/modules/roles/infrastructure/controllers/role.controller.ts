import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LoginGuard } from '../../../auth/infrastructure/guards/login.guard';

import { CreateRole } from '../../application/use-cases/create-role';
import { RolePayloadCreateDto } from '../dtos/role-payload-create.dto';

@ApiTags('Roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly createRole: CreateRole) {}

  @Post('/')
  @UseGuards(LoginGuard)
  public async create(@Body() payload: RolePayloadCreateDto) {
    return this.createRole.process(payload);
  }
}
