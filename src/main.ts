import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

const packageJson = require(path.join(__dirname, '..', 'package.json'));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
    .useGlobalPipes(new ValidationPipe({ transform: true }))
    .useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  const apiDocsOptions = new DocumentBuilder()
    .setTitle('COVID-19 API')
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();
  const document = SwaggerModule.createDocument(app, apiDocsOptions);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
