import { Body, Controller, Post } from '@nestjs/common';
import { Login } from '../../application/use-case/login';
import { AuthLoginDto } from '../dtos/auth-login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserLoginReponseDto } from '../dtos/auth-login-reponse.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly login: Login) {}

  @Post('/login')
  @ApiResponse({ type: UserLoginReponseDto })
  public async authLogin(@Body() payload: AuthLoginDto) {
    return this.login.process(payload);
  }
}
