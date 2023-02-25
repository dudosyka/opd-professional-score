import {
  Body,
  Controller,
  ForbiddenException,
  Inject,
  Post,
} from '@nestjs/common';
import { LoggerProvider } from '../providers/logger.provider';
import { ErrorOutputDto } from '../dtos/error.output.dto';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('logger')
@ApiTags('Logger')
@ApiForbiddenResponse({ description: 'Unauthorized Request' })
export class LoggerController {
  constructor(@Inject(LoggerProvider) private loggerProvider: LoggerProvider) {}

  @Post()
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  public async getAll(
    @Body('passphrase') passphrase: string,
  ): Promise<ErrorOutputDto[]> | never {
    if (passphrase == 'password')
      return (await this.loggerProvider.getAll()).map((el) => {
        try {
          return {
            id: el.id,
            name: el.name,
            message: el.message,
            stack: JSON.parse(el.stack),
            timestamp: el.createdAt,
          };
        } catch (err) {
          return null;
        }
      });
    else
      throw new ForbiddenException(
        new Error('Failed passphrase'),
        'Passphrase check failed',
      );
  }
}
