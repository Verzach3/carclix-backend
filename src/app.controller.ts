import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';
import { Roles } from './decorators/roleDecorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles('admin')
  @UseGuards(AuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
