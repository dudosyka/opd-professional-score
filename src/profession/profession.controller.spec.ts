import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionController } from './profession.controller';
import { ProfessionService } from './profession.service';

describe('ProfessionController', () => {
  let controller: ProfessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionController],
      providers: [ProfessionService],
    }).compile();

    controller = module.get<ProfessionController>(ProfessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
