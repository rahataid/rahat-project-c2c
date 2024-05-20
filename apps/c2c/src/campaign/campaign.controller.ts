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
    return await this.campaignService.findAll();
  }
}
