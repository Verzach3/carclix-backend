import { Injectable } from '@nestjs/common';
import { VehicleImage } from '@prisma/client';
import { mkdir, stat, writeFile } from 'fs/promises';
import path from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
import * as uuid from 'uuid';
@Injectable()
export class VehicleImagesService {
  constructor(private prisma: PrismaService) {}

  async findMany() {
    return await this.prisma.vehicleImage.findMany();
  }

  async getOneById(id: number) {
    return await this.prisma.vehicleImage.findUnique({
      where: { id },
    });
  }

  async getManyByVehicleId(vehicleId: number) {
    return await this.prisma.vehicleImage.findMany({
      where: { vehicleId },
    });
  }

  async createMany(
    vehicleImages: Express.Multer.File[],
    vehicleImagesData: Omit<
      { id: number; path: string; vehicleId: number },
      'path'
    >,
  ) {
    console.log(vehicleImages);
    try {
      await stat(path.join(process.env.IMAGES_FOLDER));
    } catch (error) {
      console.log('Folder not foud, creating...');
      await mkdir(path.join(process.env.IMAGES_FOLDER));
    }

    const vehicleImagesPath = [];
    vehicleImages.map(async (vehicleImage) => {
      const imagePath = path.join(`${uuid.v4()}-${vehicleImage.originalname}`);
      vehicleImagesPath.push(imagePath);
      try {
        await writeFile(
          path.join(`${process.env.IMAGES_FOLDER}/${imagePath}`),
          vehicleImage.buffer,
        );
      } catch (error) {
        console.log('Error saving image', error);
      }
    });
    const createdVehicleImages = await this.prisma.vehicleImage.createMany({
      data: vehicleImagesPath.map((path) => ({
        vehicleId: Number(vehicleImagesData.vehicleId),
        path,
      })),
    });
    return createdVehicleImages;
  }
}
