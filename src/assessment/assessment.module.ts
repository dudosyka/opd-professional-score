import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AssessmentEntity } from './entities/assessment.entity';
import { AssessmentPvkEntity } from './entities/assessment.pvk.entity';

@Module({
  imports: [
    SequelizeModule.forFeature([AssessmentEntity, AssessmentPvkEntity]),
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService],
})
export class AssessmentModule {}
