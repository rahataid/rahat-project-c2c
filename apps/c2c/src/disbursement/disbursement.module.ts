import { Module } from '@nestjs/common';
import { PrismaService } from '@rumsan/prisma';
import { DisbursementService } from './disbursement.service';
import { DisbursementController } from './disbursement.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { DisbursementMultisigService } from './disbursement.multisig.service';

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

  controllers: [DisbursementController],
  providers: [PrismaService, DisbursementService, DisbursementMultisigService],
})
export class DisbursementModule { }
