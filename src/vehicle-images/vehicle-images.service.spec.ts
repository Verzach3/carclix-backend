import { Test, TestingModule } from '@nestjs/testing';
import { VehicleImagesService } from './vehicle-images.service';

describe('VehicleImagesService', () => {
  let service: VehicleImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleImagesService],
    }).compile();

    service = module.get<VehicleImagesService>(VehicleImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
