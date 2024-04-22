import { Controller, Get } from '@nestjs/common';

import { MessagePattern } from '@nestjs/microservices';
import { JOBS } from '@rahataid/c2c-extensions/constants';
import { AppService } from './app.service';
import { CreateSettingDto, GetSettingDto } from './dtos/create.settings.dto';

const DynamicMessagePattern = (cmdPrefix: string) => {
  return MessagePattern({
    cmd: cmdPrefix,
    uuid: process.env.PROJECT_ID || '',
  });
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @DynamicMessagePattern('test')
  testing() {
    return 'I random test';
  }

  @MessagePattern({ cmd: JOBS.SETTINGS.CREATE, uuid: process.env.PROJECT_ID })
  addSettings(dto: CreateSettingDto) {
    return this.appService.addSettings(dto);
  }

  @MessagePattern({ cmd: JOBS.SETTINGS.LIST, uuid: process.env.PROJECT_ID })
  listSettings() {
    return this.appService.listSettings();
  }

  @MessagePattern({ cmd: JOBS.SETTINGS.GET, uuid: process.env.PROJECT_ID })
  getSettings(dto: GetSettingDto) {
    return this.appService.getSettings(dto);
  }
}
