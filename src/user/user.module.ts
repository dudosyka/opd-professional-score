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

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useClass: JwtOptionsProvider,
    }),
    SequelizeModule.forFeature([UserEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, BcryptUtil, JwtUtil],
})
export class UserModule {}
