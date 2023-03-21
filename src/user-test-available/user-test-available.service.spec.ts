import { Test, TestingModule } from '@nestjs/testing';
import { UserTestAvailableService } from './user-test-available.service';

describe('UserTestAvailableService', () => {
  let service: UserTestAvailableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTestAvailableService],
    }).compile();

    service = module.get<UserTestAvailableService>(UserTestAvailableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
