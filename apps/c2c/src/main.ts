import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { RpcExceptionFilter } from '@rumsan/extensions/exceptions';

async function bootstrap() {
  const PORT: number = +process.env.C2C_PORT ?? 5080;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }
  );
  app.useGlobalFilters(new RpcExceptionFilter());
  await app.listen();
  Logger.log(`🚀 Microservice is running on: http://localhost:${PORT}`);
}
bootstrap();
