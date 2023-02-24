import { Test, TestingModule } from '@nestjs/testing';
import { PvkController } from './pvk.controller';
import { PvkService } from './pvk.service';

describe('PvkController', () => {
  let controller: PvkController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PvkController],
      providers: [PvkService],
    }).compile();

    controller = module.get<PvkController>(PvkController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
