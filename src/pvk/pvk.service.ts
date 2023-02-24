import { Injectable } from '@nestjs/common';
import { PvkEntity } from './entities/pvk.entity';

@Injectable()
export class PvkService {
  // create(createPvkDto: CreatePvkDto) {
  //   return 'This action adds a new pvk';
  // }

  async findAll(): Promise<PvkEntity[]> {
    return await PvkEntity.findAll();
  }

  async findOne(id: number): Promise<PvkEntity> {
    return await PvkEntity.findOne({
      where: {
        id,
      },
    });
  }

  // update(id: number, updatePvkDto: UpdatePvkDto) {
  //   return `This action updates a #${id} pvk`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} pvk`;
  // }
}
