import { Injectable } from '@nestjs/common';
import { SettingsService } from '@rumsan/settings';
import { lowerCaseObjectKeys } from '../utils/utility';
import { CreateSettingDto, GetSettingDto } from './dtos/create.settings.dto';

@Injectable()
export class AppService {
  constructor(private readonly settingService: SettingsService) {
    this.refreshSettings();
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async addSettings(dto: CreateSettingDto) {
    return this.settingService.create(dto);
  }

  async listSettings() {
    const res = await this.settingService.listAll();
    const lowerCaseRes = lowerCaseObjectKeys(res);
    return lowerCaseRes;
  }
  async getSettings(dto: GetSettingDto) {
    const { name } = dto;
    const res = await this.settingService.getPublic(name);
    return lowerCaseObjectKeys(res);
  }

  async refreshSettings() {
    const d = await this.settingService.listPublic();
    require('./settings.config').setSettings(d);
  }

  static generateMessagePattern(patternPrefix: string) {
    const settings =
      require('./settings.config').getSettings('PROJECT_SETTINGS');
    return { cmd: patternPrefix, uuid: settings.UUID || '' };
  }
}
