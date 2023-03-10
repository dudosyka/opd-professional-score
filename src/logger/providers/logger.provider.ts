import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LoggerModel } from '../models/logger.model';
import { ErrorCreateDto } from '../dtos/error.create.dto';

@Injectable()
export class LoggerProvider {
  constructor(@InjectModel(LoggerModel) private loggerModel: LoggerModel) {}

  async log(error: ErrorCreateDto): Promise<void> {
    LoggerModel.create(error).catch((err) => {
      console.log(err);
    });
  }

  getAll(): Promise<LoggerModel[]> {
    return LoggerModel.findAll({
      order: [['id', 'DESC']],
    });
  }
}
