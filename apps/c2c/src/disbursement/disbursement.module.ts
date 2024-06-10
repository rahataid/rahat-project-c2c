import { Module } from '@nestjs/common';
import { PrismaService } from '@rumsan/prisma';
import { DisbursementService } from './disbursement.service';
import { DisbursementController } from './disbursement.controller';

@Module({
  imports: [],
  controllers: [DisbursementController],
  providers: [PrismaService, DisbursementService],
})
export class DisbursementModule {}
