import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import { BeneficiaryController } from './beneficiary.controller';
import { BeneficiaryService } from './beneficiary.service';

@Module({
  imports: [],
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService, PrismaService],
})
export class BeneficiaryModule {}
