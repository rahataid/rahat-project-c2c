import { Module } from '@nestjs/common';
import { PrismaService } from '@rumsan/prisma';
import { ProjectContants } from '@rahataid/sdk';
import { CampaignService } from './campaign.service';
import { CampaignController } from './campaign.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ProjectContants.ELClient,
        transport: Transport.REDIS,
        options: {
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        },
      },
    ]),
  ],
  controllers: [CampaignController],
  providers: [CampaignService, PrismaService],
})
export class CampaignModule {}
