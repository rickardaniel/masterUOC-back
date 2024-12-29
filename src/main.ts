import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
    // Habilitar CORS
    app.enableCors({
      origin: 'http://localhost:4200', // Tu URL de Angular
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      credentials: true,
    });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
