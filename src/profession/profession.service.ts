import { Injectable } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ProfessionEntity } from './entities/profession.entity';
import { ModelNotFoundException } from '../exceptions/model-not-found.exception';
import OutputProfessionDto from './dto/output-profession.dto';
import { UpdatePvkProfDto } from './dto/update-pvk-prof.dto';
import { ProfessionPvkEntity } from './entities/profession.pvk.entity';

@Injectable()
export class ProfessionService {
  private modelOutputProcessor(model: ProfessionEntity): OutputProfessionDto {
    return {
      id: model.id,
      name: model.name,
      description: model.description,
      author_id: model.author_id,
    };
  }
  async create(
    createProfessionDto: CreateProfessionDto,
  ): Promise<OutputProfessionDto> {
    const model = await ProfessionEntity.create({
      ...createProfessionDto,
    });

    return this.modelOutputProcessor(model);
  }

  async findAll(): Promise<ProfessionEntity[]> {
    return await ProfessionEntity.findAll();
  }

  async findOne(id: number): Promise<ProfessionEntity> {
    const model = await ProfessionEntity.findOne({
      where: {
        id,
      },
    });

    if (!model) throw new ModelNotFoundException(ProfessionEntity, id);

    return model;
  }

  async getOne(id: number): Promise<OutputProfessionDto> {
    const model = await this.findOne(id);

    return this.modelOutputProcessor(model);
  }

  async getAll(): Promise<OutputProfessionDto[]> {
    const models = await this.findAll();

    return models.map((el) => this.modelOutputProcessor(el));
  }

  async update(
    id: number,
    updateProfessionDto: UpdateProfessionDto,
  ): Promise<OutputProfessionDto> {
    const model = await this.findOne(id);

    await model.update({
      ...updateProfessionDto,
    });

    return this.modelOutputProcessor(model);
  }

  async remove(id: number): Promise<boolean> {
    const model = await this.findOne(id);

    await model.destroy();

    return true;
  }

  async updatePvkProf(prof: number, data: UpdatePvkProfDto): Promise<boolean> {
    await ProfessionPvkEntity.destroy({
      where: {
        prof_id: prof,
      },
    });

    return (
      (
        await ProfessionPvkEntity.bulkCreate(
          data.pvk_ids.map((el) => ({
            pvk_id: el,
            prof_id: prof,
          })),
        )
      ).length > 0
    );
  }
}
