import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler()
    );
    const request = context.switchToHttp().getRequest();
    const jwt = request.headers['authorization']?.split(' ')[1];
    const tokenData = await this.jwtService.verify(jwt);
    const user = tokenData.user;

    request.user = user;
    if (!requiredRoles) {
      return true;
    }
    const hasRole = request.user.roles.some((role) =>
      requiredRoles.includes(role.name)
    );

    if (!hasRole) {
      throw new ForbiddenException('You do not have access to this resource');
    }

    return hasRole;
  }
}
