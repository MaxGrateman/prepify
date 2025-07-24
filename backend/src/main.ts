import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Prepify API')
    .setDescription('TESTING PLATFORM')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document)

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  })

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
