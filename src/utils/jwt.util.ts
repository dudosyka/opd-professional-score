import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from '../user/entities/user.entity';

@Injectable()
export class JwtUtil {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  public verify(token: string) {
    return this.jwtService.verify(token, {
      secret: this.configService.get('main.jwtSecret'),
    });
  }

  public sign(user: UserEntity): string {
    return this.jwtService.sign(
      {
        sub: user.id,
        role: user.role,
      },
      { expiresIn: '30d' },
    );
  }
}
