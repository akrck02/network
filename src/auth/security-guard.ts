import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class SecurityGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = await this.usersService.findOneByEmail(request.user.username);
    request.user = user;

    if (!request.user) {
      return false;
    }

    return true;
  }
}
