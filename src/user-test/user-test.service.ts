import { Inject, Injectable } from '@nestjs/common';
import { PassUserTestDto } from './dto/pass-user-test.dto';
import { UserTestEntity } from './entities/user-test.entity';
import { UserTestAvailableService } from '../user-test-available/user-test-available.service';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import { OutputUserTestDto } from './dto/output-user-test.dto';
import { UserEntity } from '../user/entities/user.entity';
import { TestEntity } from '../test/entities/test.entity';
import { PassUserTestInviteDto } from './dto/pass-user-test-invite.dto';
import { UserTestAvailableEntity } from '../user-test-available/entities/user-test-available.entity';
import { UserTestTypesOutputDto } from './dto/user-test-types.output.dto';
import { UserTestListOutputDto } from './dto/user-test-list-output.dto';
import { UserTestOutputDto } from './dto/user-test-output.dto';

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

    if (!model)
      throw new ModelNotFoundException(
        UserTestAvailableEntity,
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

  async createInv(createUserTestDto: PassUserTestInviteDto) {
    const testModel = await TestEntity.findOne({
      where: {
        id: createUserTestDto.test_id,
      },
    });

    if (!testModel)
      throw new ModelNotFoundException(TestEntity, createUserTestDto.test_id);

    return await UserTestEntity.create({
      user_id: 1, //We always link invites to UserEntity with id 1 for passes
      test_id: createUserTestDto.test_id,
      result: createUserTestDto.result,
    });
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

  async getTypes(): Promise<UserTestTypesOutputDto[]> {
    const models = await TestEntity.findAll();

    return models.map((el) => ({
      id: el.id,
      name: el.name,
    }));
  }

  async getResults({ test_id, user_id }): Promise<UserTestListOutputDto[]> {
    const where: { test_id: number; user_id? } = {
      test_id,
    };
    if (user_id != 0) where.user_id = user_id;
    const models = await UserTestEntity.findAll({
      where,
      include: [UserEntity],
    });

    return models.map((el) => {
      return {
        id: el.id,
        user_name: el.user.name,
        avg: JSON.parse(el.result).avg,
        date: el.createdAt,
        user_id: el.user.id,
        user_age: el.user.calculateAge(),
        user_sex: el.user.sex,
      };
    });
  }

  async getOneResult(userTestId: number): Promise<UserTestOutputDto> {
    const model = await UserTestEntity.findOne({
      where: {
        id: userTestId,
      },
    });

    return {
      id: userTestId,
      avg: JSON.parse(model.result).avg,
      points: JSON.parse(model.result).points,
    };
  }
}
