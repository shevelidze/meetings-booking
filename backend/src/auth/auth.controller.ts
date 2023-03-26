import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './decorators';
import { LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const possibleAccessToken =
      await this.authService.generateUserAccessTokenByEmailAndPassword(
        loginDto.email,
        loginDto.password,
      );

    if (possibleAccessToken === null) {
      throw new BadRequestException('Invalid email or password.');
    }

    return {
      accessToken: possibleAccessToken,
    };
  }

  @HttpCode(200)
  @Post('check_session')
  checkSession() {
    return {
      message: 'Success! Your session is valid!',
    };
  }
}
