import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    if (!username || !password) {
      return;
    }

    await this.authService.validateUser(username, password);
    const user = await this.authService.login({ username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
