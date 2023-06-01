import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { BcryptUtil } from '../utils/bcrypt.util';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { JwtUtil } from '../utils/jwt.util';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtOptionsProvider } from './jwt-options.provider';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UserTestModule } from '../user-test/user-test.module';
import { UserTestService } from '../user-test/user-test.service';
import { TestService } from '../test/test.service';
import { PvkModule } from '../pvk/pvk.module';
import { PvkService } from '../pvk/pvk.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtOptionsProvider,
    }),
    SequelizeModule.forFeature([UserEntity]),
    UserTestModule,
    PvkModule,
  ],
  controllers: [UserController],
  providers: [
    PvkService,
    UserService,
    UserTestService,
    TestService,
    BcryptUtil,
    JwtUtil,
    LocalStrategy,
    JwtStrategy,
  ],
  exports: [
    PvkModule,
    UserService,
    UserTestModule,
    BcryptUtil,
    JwtUtil,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class UserModule {}
