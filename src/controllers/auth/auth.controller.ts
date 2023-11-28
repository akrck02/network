import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';

import { UserRegisterDto } from 'src/models/dto/UserRegisterDto';
import { User } from 'src/models/schemas/user';
import { Request } from 'express';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Put('register')
  async register(@Body() user: UserRegisterDto): Promise<User> {
    const result = await this.authService.register(user);
    return result;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
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