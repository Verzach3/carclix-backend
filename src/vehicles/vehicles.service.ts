import { HttpException, Injectable } from '@nestjs/common';
import { Vehicle, VehicleImage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    return await this.prisma.vehicle.findMany();
  }

  async findOne(id: number) {
    id = Number(id);
    return await this.prisma.vehicle.findUnique({
      where: { id },
    });
  }

  async create(data: Vehicle, userId: number) {
    let createdVehicles: Vehicle;
    try {
      createdVehicles = await this.prisma.vehicle.create({
        data: {
            ...data,
            customer_id: userId,
        }
      });
    } catch (error) {
        throw new HttpException("Invalid Vehicle", 400)
    }

    return createdVehicles;
  }
}
