import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from './base-exception.filter';

@Catch(HttpException)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost): any {
    const response = this.log(exception, host);
    let status = exception.getStatus();
    if (exception.getStatus() === 401) status = 403;
    this.sendResponse(response, status, {
      status: status,
      type: 'common',
      error: exception.message,
    });
  }
}
