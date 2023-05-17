import { Injectable } from '@nestjs/common';
import { PvkEntity } from './entities/pvk.entity';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import OutputPvkDto from './dto/output-pvk.dto';
import { EvaluationCriteriaEntity } from './entities/evaluation.criteria.entity';
import { WeightedCriteriaDto } from './dto/output-criteria.dto';
import { CreateCriteriaPvkDto } from './dto/create-criteria-pvk.dto';
import { PvkEvaluationCriteriaEntity } from './entities/pvk.evaluation.criteria.entity';
import { CriteriaService } from './criteria.service';
import { ParamEntity } from '../param/entities/param.entity';

@Injectable()
export class PvkService {
  constructor(private readonly criteriaService: CriteriaService) {}

  modelOutputProcessor(model: PvkEntity): OutputPvkDto {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      criteria: model.criteria.map((el) => ({
        ...this.criteriaService.processModelToDto(el),
        weight: el.dataValues.PvkEvaluationCriteriaEntity.weight,
      })),
    };
  }

  async findAll(): Promise<PvkEntity[]> {
    return await PvkEntity.findAll({
      include: [{ model: EvaluationCriteriaEntity, include: [ParamEntity] }],
    });
  }

  async findAllByIds(ids: number[]): Promise<PvkEntity[]> {
    return await PvkEntity.findAll({
      where: {
        id: ids,
      },
      include: [{ model: EvaluationCriteriaEntity, include: [ParamEntity] }],
    });
  }

  async getAll(): Promise<OutputPvkDto[]> {
    return (await this.findAll()).map((el) => this.modelOutputProcessor(el));
  }

  async getOne(id: number): Promise<OutputPvkDto> {
    return this.modelOutputProcessor(await this.findOne(id));
  }

  async findOne(id: number): Promise<PvkEntity> {
    const model = await PvkEntity.findOne({
      where: {
        id,
      },
      include: [{ model: EvaluationCriteriaEntity, include: [ParamEntity] }],
    });

    if (!model) throw new ModelNotFoundException(PvkEntity, id);

    return model;
  }

  // update(id: number, updatePvkDto: UpdatePvkDto) {
  //   return `This action updates a #${id} pvk`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} pvk`;
  // }
  async criteriaSet(
    id: number,
    data: CreateCriteriaPvkDto,
  ): Promise<WeightedCriteriaDto[]> {
    await PvkEvaluationCriteriaEntity.bulkCreate(
      data.criteria.map((el) => ({
        pvk_id: id,
        criteria_id: el.criteria_id,
        weight: el.weight,
      })),
    );

    const idToWeight = {};
    data.criteria.forEach((el) => {
      idToWeight[el.criteria_id] = el.weight;
    });

    return (await this.criteriaService.getAllByPvk(id)).map((el) => ({
      ...el,
      weight: idToWeight[el.id],
    }));
  }
}
