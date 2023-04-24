import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Administración de Calificaciones')
    .setDescription('Administración de Calificaciones en Centros Educativo')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //ignoro lo que no espero
      //forbidNonWhitelisted: true, // si recibo algo no esperado envio un bad request
    }),
  );

  app.enableCors();
  await app.listen(3000);
}
bootstrap();
