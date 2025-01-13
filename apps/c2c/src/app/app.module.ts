import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { SettingsModule } from '@rumsan/settings';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeneficiaryModule } from '../beneficiary/beneficiary.module';
import { CampaignModule } from '../campaign/campaign.module';
import { ConfigModule } from '@nestjs/config';
import { DisbursementModule } from '../disbursement/disbursement.module';
import { CommsModule } from '../comms';
import { StatsModule } from '../stats/stats.module';
import { ListenersModule } from '../listener/listener.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommsModule.forRoot(),
    PrismaModule,
    SettingsModule,
    BeneficiaryModule,
    StatsModule,
    ListenersModule,
    CampaignModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DisbursementModule,
    EventEmitterModule.forRoot({ maxListeners: 10, ignoreErrors: false }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
