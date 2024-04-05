import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serve, setup } from 'swagger-ui-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DEFAULT_PORT,
  PATH_TO_YAML_FOLDER,
  YAML_SWAGGER_FILENAME,
} from './constants/constants';
import { load } from 'js-yaml';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';
import { LoggerService } from './logger/logger.service';
import { ExceptionsFilter } from './filters/exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());
  const exceptionsFilter = new ExceptionsFilter(
    app.get(LoggerService),
    app.get(HttpAdapterHost),
  );
  app.useGlobalFilters(exceptionsFilter);

  const swaggerDocument = load(
    readFileSync(
      join(__dirname, PATH_TO_YAML_FOLDER, YAML_SWAGGER_FILENAME),
      'utf8',
    ),
  );
  app.use('/doc', serve, setup(swaggerDocument));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT') || DEFAULT_PORT;
  await app.listen(port);

  app
    .get(LoggerService)
    .verbose(`Server listening at http://localhost:${port}`);

  process.on('uncaughtException', (err, origin) => {
    // 'origin': can either be 'uncaughtException' or 'unhandledRejection'
    // https://nodejs.org/docs/latest-v20.x/api/process.html#event-uncaughtexception
    exceptionsFilter.handleUncaughtException(err, origin);
  });

  setTimeout(() => {
    throw new Error('Some Error');
  }, 1000);

  setTimeout(() => {
    new Promise((_, reject) => reject(void 0));
  }, 2000);
}
bootstrap();
