import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from '@rumsan/prisma';
// import { ProjectModule } from '../project/project.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SettingsModule } from '@rumsan/settings';

@Module({
  imports: [PrismaModule, SettingsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
