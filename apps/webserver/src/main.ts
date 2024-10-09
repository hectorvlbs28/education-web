import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';

import { MainModule } from './modules/main/main.module';
import { ServerConfigType } from './modules/config/types/server.type';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(MainModule);
  const configService: ConfigService = app.get(ConfigService);
  const { port } = configService.get<ServerConfigType>('server');
  const globalPrefix = 'api';
  app.enableCors();
  app.use(
    bodyParser.json({
      verify: (req: any, _res, buf: Buffer, encoding: string) => {
        if (req.headers['stripe-signature']) {
          const enc: BufferEncoding = encoding as BufferEncoding;
          req.rawBody = buf.toString(enc || 'utf8');
        }
      },
    })
  );
  app.use(bodyParser.json());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })
  );
  app.setGlobalPrefix(globalPrefix);
  const config = new DocumentBuilder()
    .setTitle('IFashion')
    .setDescription('')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
