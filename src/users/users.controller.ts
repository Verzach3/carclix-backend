import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roleDecorator';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}
    @Get("/one/:id")
    @Roles("customer", "admin", "seller")
    @UseGuards(AuthGuard)
    async getOneUser(@Param("id") id: number) {
        return await this.usersService.findOne(id);
    }
}
