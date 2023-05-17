import { Injectable } from '@nestjs/common';
import { CreateCriteriaDto } from './dto/create-criteria.dto';
import { OutputCriteriaDto } from './dto/output-criteria.dto';
import { EvaluationCriteriaEntity } from './entities/evaluation.criteria.entity';
import { EvaluationCriteriaParamsEntity } from './entities/evaluation.criteria.params.entity';
import { ParamEntity } from '../param/entities/param.entity';
import { PvkEvaluationCriteriaEntity } from './entities/pvk.evaluation.criteria.entity';
import { TestEntity } from '../test/entities/test.entity';

@Injectable()
export class CriteriaService {
  processModelToDto(model: EvaluationCriteriaEntity): OutputCriteriaDto {
    console.log(model.dataValues);
    console.log(model);
    return {
      id: model.id,
      name: model.name,
      params: model.params.map((el) => ({
        id: el.id,
        name: el.name,
        description: el.description,
        key: el.key,
        test_name: el.tests[0].name,
        weight: el.dataValues.EvaluationCriteriaParamsEntity.weight,
        direction: el.dataValues.EvaluationCriteriaParamsEntity.direction,
        slice: el.dataValues.EvaluationCriteriaParamsEntity.slice,
      })),
    };
  }
  async create(
    createCriteriaDto: CreateCriteriaDto,
  ): Promise<OutputCriteriaDto> {
    const criteria = await EvaluationCriteriaEntity.create({
      name: createCriteriaDto.name,
    });

    await EvaluationCriteriaParamsEntity.bulkCreate(
      createCriteriaDto.params.map((el) => ({
        criteria_id: criteria.id,
        ...el,
      })),
    );

    const result = await EvaluationCriteriaEntity.findOne({
      where: {
        id: criteria.id,
      },
      include: [{ model: ParamEntity, include: [TestEntity] }],
    });

    return this.processModelToDto(result);
  }

  async getAllByPvk(pvk_id: number): Promise<OutputCriteriaDto[]> {
    const result = await PvkEvaluationCriteriaEntity.findAll({
      where: {
        pvk_id,
      },
      include: [
        {
          model: EvaluationCriteriaEntity,
          include: [{ model: ParamEntity, include: [TestEntity] }],
        },
      ],
    });

    return result.map((el) => this.processModelToDto(el.criteria));
  }

  async getAll(): Promise<OutputCriteriaDto[]> {
    const all = await EvaluationCriteriaEntity.findAll({
      include: [{ model: ParamEntity, include: [TestEntity] }],
    });

    return all.map((el) => this.processModelToDto(el));
  }
}
