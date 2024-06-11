import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { SettingsModule } from '@rumsan/settings';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeneficiaryModule } from '../beneficiary/beneficiary.module';
import { CampaignModule } from '../campaign/campaign.module';
import { DisbursementModule } from '../disbursement/disbursement.module';

@Module({
  imports: [
    PrismaModule,
    SettingsModule,
    BeneficiaryModule,
    CampaignModule,
    DisbursementModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
