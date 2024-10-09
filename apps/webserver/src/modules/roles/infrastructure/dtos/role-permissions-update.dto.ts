import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class RolePermissionsUpdateDto {
  roleId: string;

  @ApiProperty()
  @IsArray()
  permissionIds: string[];
}
