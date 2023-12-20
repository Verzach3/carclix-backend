import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiclesController } from './vehicles/vehicles.controller';
import { VehiclesModule } from './vehicles/vehicles.module';
import { UsersModule } from './users/users.module';
import { VehicleImagesService } from './vehicle-images/vehicle-images.service';
import { VehicleImagesController } from './vehicle-images/vehicle-images.controller';
import { VehicleImagesModule } from './vehicle-images/vehicle-images.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
require('dotenv').config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_SERVER,
      synchronize: true,
      extra: {
        authentication: {
          type: 'default',
          options: {
            userName: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
          },
        },
        options: {},
      },
    }),
    VehiclesModule,
    UsersModule,
    VehicleImagesModule,
    AuthModule,
  ],
  controllers: [AppController, VehiclesController, VehicleImagesController],
  providers: [AppService, VehicleImagesService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
