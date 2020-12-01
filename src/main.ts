import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const packageJson = require(path.join(__dirname, '..', 'package.json'));
  const options = new DocumentBuilder()
    .setTitle('COVID-19 API')
    .setDescription(packageJson.description)
    .setVersion(packageJson.version)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
