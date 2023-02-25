import { Module } from '@nestjs/common';
import { ProfessionService } from './profession.service';
import { ProfessionController } from './profession.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfessionEntity } from './entities/profession.entity';

@Module({
  imports: [SequelizeModule.forFeature([ProfessionEntity])],
  controllers: [ProfessionController],
  providers: [ProfessionService],
  exports: [ProfessionService],
})
export class ProfessionModule {}
