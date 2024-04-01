import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from 'src/logger/logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerService) {}
  use(req: Request, res: Response, next: () => void) {
    const { body, method, originalUrl } = req;
    res.on('finish', () => {
      const { statusCode } = res;

      this.logger.setContext(LoggerMiddleware.name);
      this.logger.log(
        `${method} ${originalUrl}, body: ${JSON.stringify(
          body,
        )}, statusCode: ${statusCode}`,
      );
    });

    next();
  }
}
