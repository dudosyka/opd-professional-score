import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';

async function bootstrap() {
  console.log('rt', process.env);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
