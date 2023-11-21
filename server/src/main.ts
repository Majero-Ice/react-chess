import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 5000
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
