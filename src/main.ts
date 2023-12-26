import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*'
    }
  });

  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }));
  await app.listen(3000)
  
}
bootstrap();