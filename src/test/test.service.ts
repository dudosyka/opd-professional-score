import { Injectable } from '@nestjs/common';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestEntity } from './entities/test.entity';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import { TestParamEntity } from './entities/test.param.entity';

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
      include: [TestParamEntity],
    });
  }
}
