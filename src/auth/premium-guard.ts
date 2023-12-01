import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { UserType } from 'src/constants/user';
import { UsersService } from 'src/services/users/users.service';

@Injectable()
export class PremiumGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      return false;
    }

    return request.user.type == UserType.PREMIUM;
  }
}
