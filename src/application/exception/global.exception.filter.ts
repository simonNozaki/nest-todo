import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Response, Request } from 'express';

/**
 * 共通例外フィルタークラス
 */
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.error(`エラー => ${exception}`);

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getResponse<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'e.system.general.general.unexpected_error';

    response.status(status).json({
      path: request.url,
      error: {
        message: message,
      },
    });
  }
}
