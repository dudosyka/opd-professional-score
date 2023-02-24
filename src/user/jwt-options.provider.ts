import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

export class JwtOptionsProvider implements JwtOptionsFactory {
  createJwtOptions(): Promise<JwtModuleOptions> | JwtModuleOptions {
    return {
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1000d' },
    };
  }
}
