import { Module } from '@nestjs/common';
import { AssessmentService } from './assessment.service';
import { AssessmentController } from './assessment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AssessmentEntity } from './entities/assessment.entity';
import { AssessmentPvkEntity } from './entities/assessment.pvk.entity';
import { UserService } from '../user/user.service';
import { PvkService } from '../pvk/pvk.service';
import { PvkModule } from '../pvk/pvk.module';
import { UserModule } from '../user/user.module';
import { ProfessionModule } from '../profession/profession.module';
import { ProfessionService } from '../profession/profession.service';

@Module({
  imports: [
    SequelizeModule.forFeature([AssessmentEntity, AssessmentPvkEntity]),
    UserModule,
    PvkModule,
    ProfessionModule,
  ],
  controllers: [AssessmentController],
  providers: [AssessmentService, UserService, PvkService, ProfessionService],
})
export class AssessmentModule {}
