import { Test, TestingModule } from '@nestjs/testing';
import { VehicleImagesController } from './vehicle-images.controller';

describe('VehicleImagesController', () => {
  let controller: VehicleImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleImagesController],
    }).compile();

    controller = module.get<VehicleImagesController>(VehicleImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
