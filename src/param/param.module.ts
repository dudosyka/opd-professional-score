import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ParamEntity } from './entities/param.entity';

@Module({
  imports: [SequelizeModule.forFeature([ParamEntity])],
})
export class ParamModule {}
