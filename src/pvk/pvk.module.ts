import { Module } from '@nestjs/common';
import { PvkService } from './pvk.service';
import { PvkController } from './pvk.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PvkEntity } from './entities/pvk.entity';
import { EvaluationCriteriaEntity } from './entities/evaluation.criteria.entity';

@Module({
  imports: [SequelizeModule.forFeature([PvkEntity, EvaluationCriteriaEntity])],
  controllers: [PvkController],
  providers: [PvkService],
  exports: [PvkService],
})
export class PvkModule {}
