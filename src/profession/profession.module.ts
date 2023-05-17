import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfessionEntity } from './entities/profession.entity';
import { ProfessionPvkEntity } from './entities/profession.pvk.entity';
import { PvkModule } from '../pvk/pvk.module';

@Module({
  imports: [
    SequelizeModule.forFeature([ProfessionEntity, ProfessionPvkEntity]),
    PvkModule,
  ],
  controllers: [ProfessionController],
  providers: [ProfessionService],
  exports: [ProfessionService],
})
export class ProfessionModule {}
