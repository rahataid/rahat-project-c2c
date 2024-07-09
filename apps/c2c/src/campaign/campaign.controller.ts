import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { JOBS } from '@rahataid/c2c-extensions/constants';

import { CampaignService } from './campaign.service';

@Controller()
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.CREATE,
    uuid: process.env.PROJECT_ID,
  })
  createCampaign(dto) {
    return this.campaignService.create(dto);
  }
  @MessagePattern({
    cmd: JOBS.CAMPAIGN.LIST,
    uuid: process.env.PROJECT_ID,
  })
  async listCampaign(dto) {
    return await this.campaignService.findAll(dto);
  }
  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET,
    uuid: process.env.PROJECT_ID,
  })
  async getCampaign(dto) {
    return await this.campaignService.findOne(dto.id);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.TRIGGER_CAMPAIGN,
    uuid: process.env.PROJECT_ID,
  })
  triggerCampaign(dto) {
    return this.campaignService.triggerCampaign(dto.id);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET_ALL_COMMUNICATION_LOGS,
    uuid: process.env.PROJECT_ID,
  })
  async listCommunicationLogs(dto) {
    return await this.campaignService.findCommunicationLogs();
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET_ALL_COMMUNICATION_STATS,
    uuid: process.env.PROJECT_ID,
  })
  async listCommunicationStats(dto) {
    return await this.campaignService.findCommunicationStats();
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET_ALL_AUDIENCE,
    uuid: process.env.PROJECT_ID,
  })
  async listAudiences(dto) {
    return await this.campaignService.findAudience();
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET_ALL_TRANSPORT,
    uuid: process.env.PROJECT_ID,
  })
  async listTransport(dto) {
    return await this.campaignService.findTransport();
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.CREATE_AUDIENCE,
    uuid: process.env.PROJECT_ID,
  })
  async createAudience(dto) {
    return await this.campaignService.createAudience(dto);
  }
}
