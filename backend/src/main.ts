import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Agar frontend connect karna ho to CORS enable karein
  await app.listen(process.env.PORT ?? 3000);
  console.log("Port 3000")
}
bootstrap();
