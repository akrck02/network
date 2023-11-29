import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
} from '@nestjs/common';

import { UserRegisterDto } from 'src/models/dto/UserRegister.dto';
import { User } from 'src/models/schemas/user';
import { Request } from 'express';
import { AuthService } from 'src/services/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { UserValidationPipe } from 'src/pipes/user/user.pipe';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(UserValidationPipe)
  @Put('register')
  async register(@Body() user: UserRegisterDto): Promise<User> {
    const result = await this.authService.register(user);
    return result;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() request: Request) {
    return this.authService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() {
    return {
      user: 'test',
      image: 'image',
    };
  }
}
