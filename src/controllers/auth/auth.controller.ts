import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { UserRegisterDto } from 'src/models/dto/userRegister.dto';
import { User } from 'src/models/schemas/user';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserValidationPipe } from 'src/pipes/user/user.pipe';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('register')
  @UsePipes(UserValidationPipe)
  async register(@Body() user: UserRegisterDto): Promise<User> {
    const result = await this.authService.register(user);
    return result;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile() {
    return {
      user: 'test',
      image: 'image',
    };
  }
}
