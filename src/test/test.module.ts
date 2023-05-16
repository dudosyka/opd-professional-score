import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TestEntity } from './entities/test.entity';
import { TestParamEntity } from './entities/test.param.entity';

@Module({
  imports: [SequelizeModule.forFeature([TestEntity, TestParamEntity])],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService, SequelizeModule.forFeature([TestEntity])],
})
export class TestModule {}
