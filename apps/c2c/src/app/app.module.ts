import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
import { SettingsModule } from '@rumsan/settings';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
