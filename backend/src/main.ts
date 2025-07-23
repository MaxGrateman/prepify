import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
