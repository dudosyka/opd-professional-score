import { Injectable } from '@nestjs/common';
import { CreateCriteriaDto } from './dto/create-criteria.dto';
import { OutputCriteriaDto } from './dto/output-criteria.dto';
import { EvaluationCriteriaEntity } from './entities/evaluation.criteria.entity';
import { EvaluationCriteriaParamsEntity } from './entities/evaluation.criteria.params.entity';
import { ParamEntity } from '../param/entities/param.entity';
import { PvkEvaluationCriteriaEntity } from './entities/pvk.evaluation.criteria.entity';
import { TestEntity } from '../test/entities/test.entity';
import { UpdateCriteriaDto } from './dto/update-criteria.dto';
import { Op } from 'sequelize';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';

@Injectable()
export class CriteriaService {
  processModelToDto(model: EvaluationCriteriaEntity): OutputCriteriaDto {
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

  async getOne(id: number): Promise<EvaluationCriteriaEntity> {
    const model = await EvaluationCriteriaEntity.findOne({
      where: {
        id,
      },
      include: [{ model: ParamEntity, include: [TestEntity] }],
    });

    if (!model) throw new ModelNotFoundException(EvaluationCriteriaEntity, id);

    return model;
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

  async remove(criteria_id: number) {
    await EvaluationCriteriaParamsEntity.destroy({
      where: {
        criteria_id,
      },
    });
    await PvkEvaluationCriteriaEntity.destroy({
      where: {
        criteria_id,
      },
    });
    await EvaluationCriteriaEntity.destroy({
      where: {
        id: criteria_id,
      },
    });
  }

  async update(
    updateCriteriaDto: UpdateCriteriaDto,
    id: number,
  ): Promise<OutputCriteriaDto> {
    if (updateCriteriaDto.name) {
      await EvaluationCriteriaEntity.update(
        {
          name: updateCriteriaDto.name,
        },
        {
          where: {
            id,
          },
        },
      );
    }

    if (updateCriteriaDto.params) {
      await EvaluationCriteriaParamsEntity.destroy({
        where: {
          criteria_id: id,
        },
      });
      await EvaluationCriteriaParamsEntity.bulkCreate(
        updateCriteriaDto.params.map((el) => ({
          ...el,
          criteria_id: id,
        })),
      );
    }

    return this.processModelToDto(await this.getOne(id));
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
