import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(7070, '0.0.0.0');

  console.log(`Application is running at: ${await app.getUrl()}`);
}
bootstrap();
