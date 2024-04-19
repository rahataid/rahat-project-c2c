import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports:[
    ClientsModule.register([
      {
        name: ProjectContants.ELClient,
        transport: Transport.REDIS,
        options:{
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        }
      }
    ]),
  ],
  controllers: [ProjectController],
  providers: [ProjectService,PrismaService],
})
export class ProjectModule {}
