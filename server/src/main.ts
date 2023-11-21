import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT
  app.enableCors({
    origin: [
      'https://react-chess-production-4f5b.up.railway.app'
    ],
    methods: ["GET", "POST","DELETE"],
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap();
