import { Body, Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import {
  CreateCampaignDto,
  JOBS,
  ListCommDto,
  UpdateCampaignDto,
} from '@rahataid/c2c-extensions';

import { CampaignService } from './campaign.service';

@Controller()
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.CREATE,
    uuid: process.env.PROJECT_ID,
  })
  create(@Body() dto: CreateCampaignDto) {
    return this.campaignService.create(dto);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.UPDATE,
    uuid: process.env.PROJECT_ID,
  })
  update(@Body() dto: UpdateCampaignDto) {
    return this.campaignService.update(dto);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET_ALL_TRANSPORT,
    uuid: process.env.PROJECT_ID,
  })
  listTransports() {
    return this.campaignService.listTransports();
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.LIST,
    uuid: process.env.PROJECT_ID,
  })
  findAll(query: ListCommDto) {
    return this.campaignService.findAll(query);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET_CAMPAIGN_LOG,
    uuid: process.env.PROJECT_ID,
  })
  sessionLogs(payload: any) {
    return this.campaignService.listSessionLogs(payload.uuid, payload.query);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.TRIGGER_CAMPAIGN,
    uuid: process.env.PROJECT_ID,
  })
  trigger(payload: any) {
    return this.campaignService.triggerCommunication(payload.uuid);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET,
    uuid: process.env.PROJECT_ID,
  })
  findOne(payload: any) {
    return this.campaignService.findOne(payload.uuid);
  }

  @MessagePattern({
    cmd: JOBS.CAMPAIGN.GET_ALL_COMMUNICATION_LOGS,
    uuid: process.env.PROJECT_ID,
  })
  findLogs(payload: any) {
    return this.campaignService.getBroadcastLogs(payload);
  }
}
