import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ProjectContants } from '@rahataid/sdk';
import { StatsService } from '../stats/stats.service';
import { ListenersService } from './listener.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  providers: [ListenersService, StatsService],
})
export class ListenersModule {}
