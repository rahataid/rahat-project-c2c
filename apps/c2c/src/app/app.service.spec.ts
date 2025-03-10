import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { SettingsService } from '@rumsan/settings';
import { CreateSettingDto, GetSettingDto } from '@rahataid/c2c-extensions/dtos';

describe('AppService', () => {
  let appService: AppService;
  let settingsService: SettingsService;

  const mockSettingsService = {
    create: jest.fn(),
    listAll: jest.fn(),
    getPublic: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        { provide: SettingsService, useValue: mockSettingsService },
      ],
    }).compile();

    appService = module.get<AppService>(AppService);
    settingsService = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(appService).toBeDefined();
  });


  describe('listSettings', () => {
    it('should return lowercased settings', async () => {
      const mockResponse = [{ key: 'Value' }];
      settingsService.listAll = jest.fn().mockResolvedValue(mockResponse);
      const result = await appService.listSettings();
      expect(result).toEqual([{ key: 'Value' }]); // Adjust based on lowerCaseObjectKeys implementation
    });
  });

  describe('getSettings', () => {
    it('should return lowercased public settings', async () => {
      const dto: GetSettingDto = { name: 'test' };
      const mockResponse = { name: 'testValue' };
      settingsService.getPublic = jest.fn().mockResolvedValue(mockResponse);
      const result = await appService.getSettings(dto);
      expect(result).toEqual({ name: 'testValue' }); // Adjust based on lowerCaseObjectKeys implementation
    });
  });
});