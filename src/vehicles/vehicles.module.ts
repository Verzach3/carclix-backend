import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VehiclesService, PrismaService]
})
export class VehiclesModule {}
