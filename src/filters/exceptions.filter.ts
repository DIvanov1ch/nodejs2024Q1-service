import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { LoggerService } from 'src/logger/logger.service';
import { Request, Response } from 'express';

@Catch()
export class ExceptionsFilter extends BaseExceptionFilter {
  constructor(
    private logger: LoggerService,
    protected httpAdapterHost: HttpAdapterHost,
  ) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const req = ctx.getRequest<Request>();
    const res = ctx.getResponse<Response>();
    const url = httpAdapter.getRequestUrl(req);
    const method = httpAdapter.getRequestMethod(req);
    const body = JSON.stringify(req.body);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const err = exception as Error;

    const responseBody = {
      statusCode: httpStatus,
      message: err.message,
      timestamp: new Date().toISOString(),
      path: url,
    };

    const exceptionMessage = `${method} ${url}, body: ${body}, statusCode: ${httpStatus}`;
    this.logger.setContext(ExceptionsFilter.name);

    if (httpStatus === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(exceptionMessage);
    } else {
      this.logger.warn(exceptionMessage);
    }
    this.logger.debug(err.stack);

    httpAdapter.reply(res, responseBody, httpStatus);
  }

  handleUncaughtException(err: Error, origin: string) {
    const message = `${err.name}: ${origin}`;
    this.logger.setContext(origin);

    if (origin === 'unhandledRejection') {
      this.logger.error(message);
    } else {
      this.logger.fatal(message);
    }
    this.logger.debug(err.stack);
  }
}
