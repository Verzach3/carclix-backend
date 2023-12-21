import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { VehiclesService } from 'src/vehicles/vehicles.service';

@Module({
    providers: [VehiclesService, PrismaService]
})
export class VehicleImagesModule {}
