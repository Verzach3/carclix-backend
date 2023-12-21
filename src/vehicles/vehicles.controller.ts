import { Body, Controller, Post } from '@nestjs/common';
import { Vehicle } from '@prisma/client';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
export class VehiclesController {
    constructor(private vehicleService: VehiclesService) {}
    @Post("create")
    async createVehicle(@Body() vehicle: Vehicle) {
        return await this.vehicleService.create(vehicle);
    }
}
