import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { z } from 'zod';
import { loginValidator } from './auth.validations';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      await loginValidator.parseAsync(body);
    } catch (error) {
      throw new HttpException('Validation failed', 400);
    }

    return await this.authService.signIn(body.email, body.password);
  }

  @Post('register')
  async register(@Body() body: User) {
    try {
      return this.authService.signUp(body);
    } catch (error) {
      throw new HttpException('Validation failed', 400);
    }
  }
}
