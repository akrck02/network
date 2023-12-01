import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const DEFAULT_PORT = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.argv[2] || DEFAULT_PORT;

  const config = new DocumentBuilder()
    .setTitle('Network API')
    .setDescription('Backend API for the Network Social Network')
    .setVersion('1.0')
    .addBasicAuth()
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  //app.useWebSocketAdapter(new WsAdapter(app));
  await app.listen(port);
}
bootstrap();
