import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AssessmentModule } from './assessment/assessment.module';
import { ProfessionModule } from './profession/profession.module';
import { PvkModule } from './pvk/pvk.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import dbConf from './confs/db.conf';
import mainConf from './confs/main.conf';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './filters/global-exception.filter';
import { ValidationExceptionFilter } from './filters/validation-exception.filter';
import { DatabaseErrorFilter } from './filters/database-error.filter';
import { LoggerModule } from './logger/logger.module';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { UserTestModule } from './user-test/user-test.module';
import { TestModule } from './test/test.module';
import { UserTestAvailableModule } from './user-test-available/user-test-available.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env', '.env'],
      load: [dbConf, mainConf],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      ...dbConf(),
      autoLoadModels: true,
      synchronize: true,
    }),
    LoggerModule,
    UserModule,
    ProfessionModule,
    PvkModule,
    AssessmentModule,
    UserTestModule,
    TestModule,
    UserTestAvailableModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: DatabaseErrorFilter,
    },
  ],
})
export class AppModule {}
