import { Module } from '@nestjs/common';
import { PvkService } from './pvk.service';
import { PvkController } from './pvk.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PvkEntity } from './entities/pvk.entity';
import { EvaluationCriteriaEntity } from './entities/evaluation.criteria.entity';
import { PvkEvaluationCriteriaEntity } from './entities/pvk.evaluation.criteria.entity';
import { CriteriaService } from './criteria.service';
import { EvaluationCriteriaParamsEntity } from './entities/evaluation.criteria.params.entity';
import { CriteriaController } from './criteria.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([
      PvkEntity,
      PvkEvaluationCriteriaEntity,
      EvaluationCriteriaEntity,
      EvaluationCriteriaParamsEntity,
    ]),
  ],
  controllers: [PvkController, CriteriaController],
  providers: [PvkService, CriteriaService],
  exports: [
    PvkService,
    CriteriaService,
    SequelizeModule.forFeature([
      PvkEntity,
      PvkEvaluationCriteriaEntity,
      EvaluationCriteriaEntity,
      EvaluationCriteriaParamsEntity,
    ]),
  ],
})
export class PvkModule {}
