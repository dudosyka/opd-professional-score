import { Test, TestingModule } from '@nestjs/testing';
import { UserTestAvailableController } from './user-test-available.controller';
import { UserTestAvailableService } from './user-test-available.service';

describe('UserTestAvailableController', () => {
  let controller: UserTestAvailableController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserTestAvailableController],
      providers: [UserTestAvailableService],
    }).compile();

    controller = module.get<UserTestAvailableController>(
      UserTestAvailableController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
