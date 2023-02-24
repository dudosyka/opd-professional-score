import { Injectable } from '@nestjs/common';
import { CreateProfessionDto } from './dto/create-profession.dto';
import { UpdateProfessionDto } from './dto/update-profession.dto';
import { ProfessionEntity } from './entities/profession.entity';

@Injectable()
export class ProfessionService {
  async create(
    createProfessionDto: CreateProfessionDto,
  ): Promise<ProfessionEntity> {
    return await ProfessionEntity.create({
      ...createProfessionDto,
    });
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

    if (!model) return null;

    return model;
  }

  async update(id: number, updateProfessionDto: UpdateProfessionDto) {
    const model = await this.findOne(id);

    if (!model) return null;

    await model.update({
      ...updateProfessionDto,
    });

    return model;
  }

  async remove(id: number) {
    const model = await this.findOne(id);

    if (!model) return null;

    await model.destroy();

    return true;
  }
}
