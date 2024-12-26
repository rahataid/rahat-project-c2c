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
import {
  createContractInstance,
  createContractInstanceSign,
} from '../utils/web3';
import { lastValueFrom } from 'rxjs';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 20 });

@Injectable()
export class BeneficiaryService {
  private rsprisma;
  constructor(
    protected prisma: PrismaService,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy // private eventEmitter: EventEmitter2
  ) {
    this.rsprisma = prisma.rsclient;
  }
  async create(dto: CreateBeneficiaryDto) {
    // const contract = await createContractInstanceSign(
    //   'C2CPROJECT',
    //   this.prisma.setting
    // );
    // console.log({ contract });
    // console.log({ dto });
    // const addBeneficiary = await contract.addBeneficiary(dto.walletAddress);
    // console.log({ addBeneficiary });

    return this.rsprisma.beneficiary.create({
      data: dto,
    });
  }

  async createMany(dto) {
    return this.rsprisma.beneficiary.createMany({ data: dto });
  }

  async findAll(dto) {
    const { page, perPage, sort, order } = dto;

    const orderBy: Record<string, 'asc' | 'desc'> = {};
    orderBy[sort] = order;

    const projectData = await paginate(
      this.rsprisma.beneficiary,
      {
        where: {
          deletedAt: null,
        },
        orderBy,
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
    const projectdata = await this.rsprisma.beneficiary.findMany({
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

  async verfiyWallet(verfiyWalletDto: VerifyWalletDto) {
    const { walletAddress } = verfiyWalletDto;
    return this.rsprisma.beneficiary.update({
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
    const { page, perPage, sort, order, disableSync, uuid } = dto;
    const orderBy: Record<string, 'asc' | 'desc'> = {};
    orderBy[sort] = order;
    let where: any = {
      deletedAt: null,
      ...(disableSync && { beneficiariesSynced: false }),
      ...(uuid && { uuid: { in: uuid } }),
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
