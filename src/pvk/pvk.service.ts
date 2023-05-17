import { Injectable } from '@nestjs/common';
import { PvkEntity } from './entities/pvk.entity';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import OutputPvkDto from './dto/output-pvk.dto';
import { CreateCriteriaDto, CriteriaDto } from './dto/create-criteria.dto';
import { EvaluationCriteriaEntity } from './entities/evaluation.criteria.entity';

@Injectable()
export class PvkService {
  // create(createPvkDto: CreatePvkDto) {
  //   return 'This action adds a new pvk';
  // }

  private modelOutputProcessor(model: PvkEntity): OutputPvkDto {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
    };
  }

  async findAll(): Promise<PvkEntity[]> {
    return await PvkEntity.findAll();
  }

  async findAllByIds(ids: number[]): Promise<PvkEntity[]> {
    return await PvkEntity.findAll({
      where: {
        id: ids,
      },
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
    data: CriteriaDto,
  ): Promise<EvaluationCriteriaEntity[]> {
    return await EvaluationCriteriaEntity.bulkCreate(
      data.criteria.map((el) => ({
        pvk_id: id,
        ...el,
      })),
    );
  }

  async getWithCriteria(pvkId: number): Promise<PvkEntity> {
    return await PvkEntity.findOne({
      where: {
        id: pvkId,
      },
      include: [EvaluationCriteriaEntity],
    });
  }
}
