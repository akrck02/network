import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.argv[2] || DEFAULT_PORT;

  await app.listen(port);
}
bootstrap();
