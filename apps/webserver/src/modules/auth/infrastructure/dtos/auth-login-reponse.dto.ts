import { ApiProperty } from '@nestjs/swagger';

export class DataUser {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
export class UserLoginReponseDto {
  @ApiProperty({ type: DataUser })
  data: DataUser;

  @ApiProperty()
  statusCode: number;
}
