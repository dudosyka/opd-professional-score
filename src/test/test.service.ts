import { Injectable, Param } from '@nestjs/common';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestEntity } from './entities/test.entity';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import { TestParamEntity } from './entities/test.param.entity';
import { CreateParamDto } from '../param/dto/create-param.dto';
import { ParamEntity } from '../param/entities/param.entity';
import { Op } from 'sequelize';

@Injectable()
export class TestService {
  async findAll() {
    return await TestEntity.findAll();
  }

  async findOne(id: number) {
    const model = await TestEntity.findOne({
      where: {
        id,
      },
    });

    if (!model) throw new ModelNotFoundException(TestEntity, id);

    return model;
  }

  async update(id: number, updateTestDto: UpdateTestDto) {
    const model = await this.findOne(id);

    return await model.update({
      ...updateTestDto,
    });
  }

  async getAllWithParams(): Promise<TestEntity[]> {
    return await TestEntity.findAll({
      where: {
        [Op.not]: {
          id: 0,
        },
      },
      include: [ParamEntity],
    });
  }

  async createParam(
    testId: number,
    createParamDto: CreateParamDto,
  ): Promise<TestParamEntity> {
    const param = await ParamEntity.create({
      ...createParamDto,
    });
    return await TestParamEntity.create({
      test_id: testId,
      param_id: param.id,
    });
  }

  async getWithParams(testId: number): Promise<TestEntity> {
    return TestEntity.findOne({
      where: {
        id: testId,
      },
      include: [ParamEntity],
    });
  }
}
