import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import {
  BlockchainProjectDto,
  CreateCampaignDto,
  CreateProjectDto,
  UpdateProjectDto,
} from '@rahataid/c2c-extensions';

@Injectable()
export class CampaignService {
  private rsprisma;
  constructor(protected prisma: PrismaService) {
    this.rsprisma = prisma.rsclient;
  }
  async create(createCampaignDto: CreateCampaignDto) {
    return await this.rsprisma.campaign.create({
      data: { ...createCampaignDto },
    });
  }

  async findAll() {
    const campaign = await this.rsprisma.campaign.findMany();
    return campaign;
  }
}
