import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VehicleImagesService } from './vehicle-images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { VehicleImage } from '@prisma/client';
import { mkdir, stat, writeFile } from 'fs/promises';
import * as uuid from 'uuid';
import { Response } from 'express';
import { Stats, createReadStream } from 'fs';
import { join } from 'path';
import { Roles } from 'src/decorators/roleDecorator';
import { AuthGuard } from 'src/auth/auth.guard';
require('dotenv').config();
@Controller('vehicles/images')
export class VehicleImagesController {
  constructor(private readonly vehicleImagesService: VehicleImagesService) {}

  @Get('list')
  async getAllVehicleImages() {
    return await this.vehicleImagesService.findMany();
  }

  @Get('list/:id')
  async getVehicleImages(@Param('id') id: number) {
    return await this.vehicleImagesService.getManyByVehicleId(id);
  }

  @Get("one/:id")
  async getVehicleImage(@Res() res: Response, @Param("id") id: number) {
    id = Number(id);
    console.log(process.env.IMAGES_FOLDER);
    const vehicleImage = await this.vehicleImagesService.getOneById(id);
    if (!vehicleImage) {
        throw new HttpException("Vehicle Image not found", 404);
    }
    const path = vehicleImage.path;
    let file: Stats;
    try {
        file = await stat(join(process.env.IMAGES_FOLDER,path));
    } catch (error) {
        console.log(error);
        throw new HttpException("Vehicle Image not found", 404);
    }
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': file.size,
    });
    const readStream = createReadStream(join(process.env.IMAGES_FOLDER,path))
    return readStream.pipe(res);
  }

  @Post('create')
  @Roles("admin", "seller")
  @UseGuards(AuthGuard)
  @UseInterceptors(FilesInterceptor('images'))
  async createVehicleImage(
    @UploadedFiles() vehicleImages: Express.Multer.File[],
    @Body() vehicleImagesData: Omit<VehicleImage, 'path'>,
  ) {
    return await this.vehicleImagesService.createMany(
      vehicleImages,
      vehicleImagesData,
    );
  }
}
