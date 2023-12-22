import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { z } from 'zod';
import { loginValidator } from './auth.validations';
import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ) {
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

  @Get('permission-check')
  async permissionCheck(@Req() request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (!token) {
      return { permission: 'none' };
    }
    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_SECRET,
    });
    return { permission: `${payload.role ?? 'none'}` };
  }
}
