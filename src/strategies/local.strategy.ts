import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userProvider: UserService) {
    //We will auth user only by code, so to prevent Unauthorized exception we tell to PassportLocal that our code field is both "username" and "password"
    super({
      usernameField: 'login',
      passwordField: 'password',
    });
  }

  async validate(login: string, password: string): Promise<UserEntity> | never {
    const user = await this.userProvider.validate(login, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
