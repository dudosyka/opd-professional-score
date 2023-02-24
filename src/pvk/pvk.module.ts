import { Module } from '@nestjs/common';
import { PvkService } from './pvk.service';
import { PvkController } from './pvk.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PvkEntity } from './entities/pvk.entity';

@Module({
  imports: [SequelizeModule.forFeature([PvkEntity])],
  controllers: [PvkController],
  providers: [PvkService],
})
export class PvkModule {}
