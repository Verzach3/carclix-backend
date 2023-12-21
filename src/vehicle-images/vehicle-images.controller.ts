import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { VehicleImagesService } from './vehicle-images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { VehicleImage } from '@prisma/client';
import { mkdir, stat, writeFile } from 'fs/promises';
import * as uuid from 'uuid';
require('dotenv').config();
@Controller('vehicle-images')
export class VehicleImagesController {
  constructor(private readonly vehicleImagesService: VehicleImagesService) {}

  @Post('create')
  @UseInterceptors(FilesInterceptor('file'))
  async createVehicleImage(
    @UploadedFiles() vehicleImages: Express.Multer.File[],
    @Body() vehicleImagesData: Omit<VehicleImage, 'path'>,
  ) {
    try {
      await stat(process.env.IMAGES_FOLDER);
    } catch (error) {
      console.log('Folder not foud, creating...');
      await mkdir(process.env.IMAGES_FOLDER);
    }

    const vehicleImagesPath = [];
    vehicleImages.map(async (vehicleImage) => {
      const imagePath = `${uuid.v4()}-${vehicleImage.filename}`;
      vehicleImagesPath.push(imagePath);
      try {
        await writeFile(
          `${process.env.IMAGES_FOLDER}/${imagePath}`,
          vehicleImage.buffer,
        );
      } catch (error) {
        console.log('Error saving image', error);
      }
    });
    const createdVehicleImages = await this.vehicleImagesService.createMany(
      vehicleImagesPath.map((path) => ({
        ...vehicleImagesData,
        path,
      })),
    );
    return createdVehicleImages;
  }
}
