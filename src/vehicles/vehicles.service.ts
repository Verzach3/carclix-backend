import { Injectable } from '@nestjs/common';
import { Vehicle, VehicleImage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehiclesService {
    constructor(private prisma: PrismaService) {}

    async findMany() {
        return await this.prisma.vehicle.findMany();
    }

    async findOne(id: number) {
        return await this.prisma.vehicle.findUnique({
            where: { id },
        });
    }

    async create(data: Vehicle) {
        const createdVehicles = await this.prisma.vehicle.create({
            data,
        });
        
        return createdVehicles;
        
    }
}
