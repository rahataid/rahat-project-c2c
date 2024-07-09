import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { CommunicationService } from '@rumsan/communication/services/communication.client';

import { PrismaService } from '@rumsan/prisma';

@Injectable()
export class CampaignService {
  private rsprisma;
  private communicationService: CommunicationService;

  constructor(
    protected prisma: PrismaService,
    private configService: ConfigService
  ) {
    this.rsprisma = prisma.rsclient;
    this.communicationService = new CommunicationService({
      baseURL: this.configService.get('COMMUNICATION_URL') || '',
      headers: {
        appId: this.configService.get('COMMUNICATION_APP_ID') || '',
      },
    });
  }
  async create(createCampaignDto: any) {
    const campaign =
      await this.communicationService.communication.createCampaign(
        createCampaignDto
      );
    return await this.rsprisma.campaign.create({
      data: { campaignId: campaign.data.id },
    });
  }

  async findAll(data) {
    const campaign = await this.rsprisma.campaign.findMany();
    const ids = campaign.map((data) => data.campaignId);
    const result = await this.communicationService.communication.listCampaign({
      ids: JSON.stringify(ids),
    });
    return result.data;
  }

  async findOne(id) {
    const result = await this.communicationService.communication.getCampaign(
      Number(id)
    );
    return result.data;
  }
  async triggerCampaign(id) {
    const result =
      await this.communicationService.communication.triggerCampaign(Number(id));
    return result.data;
  }

  async findAudience() {
    const result = await this.communicationService.communication.listAudience();
    return result.data;
  }

  async findTransport() {
    const result =
      await this.communicationService.communication.listTransport();
    return result.data;
  }

  async createAudience(data) {
    const result = await this.communicationService.communication.createAudience(
      data
    );
    return result.data;
  }

  async findCommunicationLogs() {
    const result =
      await this.communicationService.communication.getCommunicationLogs();
    return result.data;
  }

  async findCommunicationStats() {
    const result =
      await this.communicationService.communication.getCommunicationStats();
    return result.data;
  }
}
