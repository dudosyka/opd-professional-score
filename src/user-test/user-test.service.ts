import { Inject, Injectable } from '@nestjs/common';
import { PassUserTestDto } from './dto/pass-user-test.dto';
import { UserTestEntity } from './entities/user-test.entity';
import { UserTestAvailableService } from '../user-test-available/user-test-available.service';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import { OutputUserTestDto } from './dto/output-user-test.dto';
import { UserEntity } from '../user/entities/user.entity';
import { TestEntity } from '../test/entities/test.entity';

@Injectable()
export class UserTestService {
  constructor(
    @Inject(UserTestAvailableService)
    private userTestAvailableService: UserTestAvailableService,
  ) {}
  async create(createUserTestDto: PassUserTestDto): Promise<OutputUserTestDto> {
    const model = await this.userTestAvailableService.findOne(
      createUserTestDto.user_available_test,
    );

    const userTestModel = await UserTestEntity.create({
      user_id: model.user_id,
      test_id: model.test_id,
      result: createUserTestDto.result,
    });

    await this.userTestAvailableService.remove(model.id);

    return userTestModel;
  }

  findAll(): Promise<OutputUserTestDto[]> {
    return UserTestEntity.findAll({
      include: [UserEntity, TestEntity],
    });
  }

  findByUser(userId: number): Promise<OutputUserTestDto[]> {
    return UserTestEntity.findAll({
      where: {
        user_id: userId,
      },
      include: [UserEntity, TestEntity],
    });
  }

  findByUserTest(userId: number, testId: number): Promise<OutputUserTestDto[]> {
    return UserTestEntity.findAll({
      where: {
        user_id: userId,
        test_id: testId,
      },
      include: [UserEntity, TestEntity],
    });
  }

  findOne(id: number): Promise<OutputUserTestDto> {
    const model = UserTestEntity.findOne({
      where: {
        id,
      },
      include: [UserEntity, TestEntity],
    });

    if (!model) throw new ModelNotFoundException(UserTestEntity, id);

    return model;
  }
}
