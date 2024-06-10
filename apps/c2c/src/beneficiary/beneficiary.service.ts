import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import { UUID } from 'crypto';
import {
  CreateBeneficiaryDto,
  UpdateBeneficiaryDto,
  VerifyWalletDto,
} from '@rahataid/c2c-extensions/dtos/beneficiary';
import {
  createContractInstance,
  createContractInstanceSign,
} from '../utils/web3';

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

  async findAll() {
    const data = await this.rsprisma.beneficiary.findMany();
    // projectData.data = data;
    // console.log('projectData', projectData);
    const projectData = {
      data: data,
    };
    return this.client.send(
      { cmd: 'rahat.jobs.beneficiary.list_by_project' },
      projectData
    );
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
}
