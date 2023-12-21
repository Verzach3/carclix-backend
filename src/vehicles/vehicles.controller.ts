import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { VehiclesService } from './vehicles.service';
import { getPayloadFromToken } from 'src/util/getPayloadFromToken';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/decorators/roleDecorator';

@Controller('vehicles')
export class VehiclesController {
    constructor(private vehicleService: VehiclesService, private jwtService: JwtService) {}

    @Roles("admin", "seller")
    @UseGuards(AuthGuard)
    @Post("create")
    async createVehicle(@Req() request: Request, @Body() vehicle: Vehicle) {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        console.log(vehicle);
        const { sub } = await getPayloadFromToken(token, this.jwtService);
        return await this.vehicleService.create(vehicle, sub);
    }

    @Get("all")
    async getAllVehicles() {
        return await this.vehicleService.findMany();
    }
}
