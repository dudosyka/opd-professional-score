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

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.env', '.env'],
      load: [dbConf],
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      ...dbConf(),
      autoLoadModels: true,
      synchronize: true,
    }),
    UserModule,
    ProfessionModule,
    PvkModule,
    AssessmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
