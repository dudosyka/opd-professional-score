import { Module } from '@nestjs/common';
import { UserTestService } from './user-test.service';
import { UserTestController } from './user-test.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTestEntity } from './entities/user-test.entity';
import { UserTestAvailableModule } from '../user-test-available/user-test-available.module';
import { TestModule } from '../test/test.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserTestEntity]),
    UserTestAvailableModule,
    TestModule,
  ],
  controllers: [UserTestController],
  providers: [UserTestService],
})
export class UserTestModule {}
