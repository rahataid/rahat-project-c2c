import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import { UUID } from 'crypto';
import {
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
} from '@rahataid/c2c-extensions/dtos/beneficiary';

@Injectable()
export class BeneficiaryService {
  private rsprisma;
  constructor(protected prisma: PrismaService) {
    this.rsprisma = prisma.rsclient;
  }
  async create(dto: CreateBeneficiaryDto) {
    return this.rsprisma.beneficiary.create({
      data: dto,
    });
  }

  async createMany(dto) {
    return this.rsprisma.beneficiary.createMany({ data: dto });
  }

  async findAll(data) {
    const projectdata = await this.rsprisma.beneficiary.findMany();

    const combinedData = data.data
      .filter((item) =>
        projectdata.some((ben) => ben.uuid === item.beneficiaryId)
      )
      .map((item) => {
        const matchedBeneficiary = projectdata.find(
          (ben) => ben.uuid === item.beneficiaryId
        );
        return {
          ...item,
          Beneficiary: {
            ...matchedBeneficiary,
            ...item.Beneficiary,
          },
        };
      });

    return { data: combinedData, meta: data.meta };
  }

  async findByUUID(uuid: UUID) {
    return await this.rsprisma.beneficiary.findUnique({ where: { uuid } });
  }

  async findOne(payload) {
    const { uuid, data } = payload;
    const projectBendata = await this.rsprisma.beneficiary.findUnique({
      where: { uuid },
    });
    if (data) return { ...data, ...projectBendata };
    return projectBendata;
  }

  async update(id: number, updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return await this.rsprisma.beneficiary.update({
      where: { id: id },
      data: { ...updateBeneficiaryDto },
    });
  }
}
