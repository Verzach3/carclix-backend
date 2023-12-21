import { Injectable } from '@nestjs/common';
import { VehicleImage } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VehicleImagesService {
  constructor(private prisma: PrismaService) {}

  async createMany(images: VehicleImage[]) {
    const createdImages = await this.prisma.vehicleImage.createMany({
      data: images,
    });
    return createdImages;
  }
}
