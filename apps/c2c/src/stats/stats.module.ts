import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ProjectContants.ELClient,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST || 'localhost',
          port: parseInt(process.env.REDIS_PORT) || 6379,
          password: process.env.REDIS_PASSWORD || '',
        },
      },
    ]),
  ],
  controllers: [StatsController],
  providers: [StatsService],
  exports: [StatsService],
})
export class StatsModule {}
