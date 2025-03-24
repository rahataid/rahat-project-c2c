import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { paginator, PaginatorTypes, PrismaService } from '@rumsan/prisma';
import { UUID } from 'crypto';
import {
  AssignBenfGroupToProject,
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
  VerifyWalletDto,
} from '@rahataid/c2c-extensions/dtos/beneficiary';
import { lastValueFrom } from 'rxjs';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 20 });

@Injectable()
export class BeneficiaryService {
  private rsprisma;
  constructor(
    protected prisma: PrismaService,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy // private eventEmitter: EventEmitter2
  ) {
    this.rsprisma = this.prisma.rsclient;
  }
  async create(dto: CreateBeneficiaryDto) {

    return this.prisma.beneficiary.create({
      data: dto,
    });
  }

  async createMany(dto) {
    return this.prisma.beneficiary.createMany({ data: dto });
  }

  async findAll(dto) {
    const { page, perPage, sort, order } = dto;

    const orderBy: Record<string, 'asc' | 'desc'> = {};
    orderBy[sort] = order;

    const projectData = await paginate(
      this.prisma.beneficiary,
      {
        where: {
          deletedAt: null,
        },
        orderBy,
        include: {
          DisbursementBeneficiary: true,
        },
      },
      {
        page,
        perPage,
      }
    );

    return this.client.send(
      { cmd: 'rahat.jobs.beneficiary.list_by_project' },
      projectData
    );
  }

  async findAllBeneficaryPii(data) {
    const projectdata = await this.prisma.beneficiary.findMany({
      where: { type: data?.status },
    });

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
    return await this.prisma.beneficiary.findUnique({ where: { uuid } });
  }

  async findOne(payload) {
    const { uuid, data } = payload;
    const projectBendata = await this.prisma.beneficiary.findUnique({
      where: { uuid },
    });
    if (data) return { ...data, ...projectBendata };
    return projectBendata;
  }

  async update(id: number, updateBeneficiaryDto: UpdateBeneficiaryDto) {
    return await this.prisma.beneficiary.update({
      where: { id: id },
      data: { ...updateBeneficiaryDto },
    });
  }

  async verfiyWallet(verfiyWalletDto: VerifyWalletDto) {
    const { walletAddress } = verfiyWalletDto;
    return this.prisma.beneficiary.update({
      where: { walletAddress },
      data: { isVerified: true },
    });
  }

  // *****  beneficiary groups ********** //
  async getOneGroup(uuid: UUID) {
    const benfGroup = await this.prisma.beneficiaryGroups.findUnique({
      where: {
        uuid: uuid,
        deletedAt: null,
      },
    });
    if (!benfGroup) throw new RpcException('Beneficiary group not found.');

    return lastValueFrom(
      this.client.send(
        { cmd: 'rahat.jobs.beneficiary.get_one_group_by_project' },
        benfGroup.uuid
      )
    );
  }

  async addGroupToProject(payload: AssignBenfGroupToProject) {
    const { beneficiaryGroupData } = payload;
    return await this.prisma.beneficiaryGroups.create({
      data: {
        uuid: beneficiaryGroupData.uuid,
        name: beneficiaryGroupData.name,
      },
    });
  }

  async getAllGroups(dto) {
    const { page, perPage, sort, order, disableSync, uuid, name } = dto;
    const orderBy: Record<string, 'asc' | 'desc'> = {};
    orderBy[sort] = order;
    let where: any = {
      deletedAt: null,
      ...(name && { name: { contains: name, mode: 'insensitive' } }),
    };

    const benfGroups = await paginate(
      this.prisma.beneficiaryGroups,
      {
        where: where,
        orderBy,
      },
      {
        page,
        perPage,
      }
    );

    return this.client.send(
      { cmd: 'rahat.jobs.beneficiary.list_group_by_project' },
      benfGroups
    );
  }
}
