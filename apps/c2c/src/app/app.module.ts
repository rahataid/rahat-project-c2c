import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { SettingsModule } from '@rumsan/settings';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BeneficiaryModule } from '../beneficiary/beneficiary.module';

@Module({
  imports: [PrismaModule, SettingsModule, BeneficiaryModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
