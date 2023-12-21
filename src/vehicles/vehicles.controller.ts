import { Body, Controller, Get, Post } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private vehicleService: VehiclesService) {}
    @Post("create")
    async createVehicle(@Body() vehicle: Vehicle) {
        console.log(vehicle);
        return await this.vehicleService.create(vehicle);
    }

    @Get("all")
    async getAllVehicles() {
        return await this.vehicleService.findMany();
    }
}
