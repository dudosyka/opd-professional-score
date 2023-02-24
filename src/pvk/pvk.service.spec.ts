import { Test, TestingModule } from '@nestjs/testing';
import { PvkService } from './pvk.service';

describe('PvkService', () => {
  let service: PvkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PvkService],
    }).compile();

    service = module.get<PvkService>(PvkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
