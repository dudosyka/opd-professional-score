import { Module } from '@nestjs/common';
import { UserTestAvailableService } from './user-test-available.service';
import { UserTestAvailableController } from './user-test-available.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserTestAvailableEntity } from './entities/user-test-available.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserTestAvailableEntity])],
  controllers: [UserTestAvailableController],
  providers: [UserTestAvailableService],
  exports: [
    SequelizeModule.forFeature([UserTestAvailableEntity]),
    UserTestAvailableService,
  ],
})
export class UserTestAvailableModule {}
