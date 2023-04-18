import { BadRequestException, Injectable } from '@nestjs/common';
import { UserTestAvailableDto } from './dto/user-test-available.dto';
import { UpdateUserTestAvailableDto } from './dto/update-user-test-available.dto';
import { CreateUserTestAvailableDto } from './dto/create-user-test-available.dto';
import { UserTestAvailableEntity } from './entities/user-test-available.entity';
import { OutputUserTestAvailableDto } from './dto/output-user-test-available.dto';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import { UserEntity } from '../user/entities/user.entity';
import { TestEntity } from '../test/entities/test.entity';

@Injectable()
export class UserTestAvailableService {
  private checkUniqueRelatives(tests: UserTestAvailableDto[]) {
    const relative_ids = [];
    for (const test of tests) {
      if (relative_ids.includes(test.relative_id)) return false;

      relative_ids.push(test.relative_id);
    }
    return true;
  }
  async create(
    createUserTestAvailableDto:
      | CreateUserTestAvailableDto
      | UpdateUserTestAvailableDto,
  ): Promise<OutputUserTestAvailableDto[]> {
    const checkUnique = this.checkUniqueRelatives(
      createUserTestAvailableDto.tests,
    );

    if (!checkUnique)
      throw new BadRequestException('Failed! Duplicate relative_id');

    return await UserTestAvailableEntity.bulkCreate(
      createUserTestAvailableDto.tests.map((el) => {
        return {
          ...el,
        };
      }),
    );
  }

  findAll(): Promise<OutputUserTestAvailableDto[]> {
    return UserTestAvailableEntity.findAll({
      include: [UserEntity, TestEntity],
    });
  }

  findByUser(userId: number): Promise<OutputUserTestAvailableDto[]> {
    return UserTestAvailableEntity.findAll({
      where: {
        user_id: userId,
      },
      include: [TestEntity, UserEntity],
    }).then((res) =>
      res.map((el) => {
        return {
          id: el.id,
          settings: el.settings,
          relative_id: el.relative_id,
          user_id: el.user_id,
          user: el.user,
          test_id: el.test_id,
          test: el.test,
        };
      }),
    );
  }

  findOne(id: number): Promise<OutputUserTestAvailableDto> {
    const model = UserTestAvailableEntity.findOne({
      where: {
        id,
      },
      include: [UserEntity, TestEntity],
    });

    if (!model) throw new ModelNotFoundException(UserTestAvailableEntity, id);

    return model;
  }

  async update(
    userId: number,
    updateUserTestAvailableDto: UpdateUserTestAvailableDto,
  ): Promise<OutputUserTestAvailableDto[]> {
    const checkUnique = this.checkUniqueRelatives(
      updateUserTestAvailableDto.tests,
    );

    if (!checkUnique)
      throw new BadRequestException('Failed! Duplicate relative_id');

    await UserTestAvailableEntity.destroy({
      where: {
        user_id: userId,
      },
    });

    return await this.create(updateUserTestAvailableDto);
  }

  private async recountRelatives(userId: number) {
    const models = await UserTestAvailableEntity.findAll({
      where: {
        user_id: userId,
      },
    });

    const sorted = models
      .sort((a, b) => {
        return a.relative_id - b.relative_id;
      })
      .map((el, key) => {
        el.relative_id = key + 1;
        return el;
      });

    await Promise.all(
      sorted.map(async (el) => {
        await el.save();
      }),
    );
  }

  async remove(id: number) {
    const model = await this.findOne(id);

    await UserTestAvailableEntity.destroy({
      where: {
        id,
      },
    });

    await this.recountRelatives(model.user_id);

    return true;
  }
}
