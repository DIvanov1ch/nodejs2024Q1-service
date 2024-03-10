import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serve, setup } from 'swagger-ui-express';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  DEFAULT_PORT,
  PATH_TO_YAML_FOLDER,
  YAML_SWAGGER_FILENAME,
} from './constants';
import { load } from 'js-yaml';
import { join } from 'node:path';
import { readFileSync } from 'node:fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

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
  console.log(`Server listening at http://localhost:${port}`);
}
bootstrap();
