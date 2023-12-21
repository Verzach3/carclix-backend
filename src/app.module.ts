import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesModule } from './vehicles/vehicles.module';
import { VehicleImagesService } from './vehicle-images/vehicle-images.service';
import { VehicleImagesController } from './vehicle-images/vehicle-images.controller';
import { VehicleImagesModule } from './vehicle-images/vehicle-images.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { VehiclesService } from './vehicles/vehicles.service';
require('dotenv').config();

@Module({
  imports: [
    VehiclesModule,
    UsersModule,
    VehicleImagesModule,
    AuthModule,
    PrismaModule,
  ],
  controllers: [AppController, VehiclesController, VehicleImagesController],
  providers: [AppService, VehicleImagesService, PrismaService, VehiclesService],
})
export class AppModule {
}
