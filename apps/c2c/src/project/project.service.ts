import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import { createContractInstanceSign, getContractByName } from '../utils/web3';
import {
  BlockchainProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
} from '@rahataid/c2c-extensions';

@Injectable()
export class ProjectService {
  private rsprisma;
  constructor(
    protected prisma: PrismaService,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy
  ) {
    this.rsprisma = prisma.rsclient;
  }
  async create(createProjectDto: CreateProjectDto) {
    return await this.rsprisma.project.create({
      data: { ...createProjectDto },
    });
  }

  async findAll() {
    return await this.rsprisma.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.rsprisma.project.findUnique({
      where: { id: id },
    });
    const beneficiary = await this.rsprisma.beneficiary.findMany();

    return { ...project, beneficiary };
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    return await this.rsprisma.project.update({
      where: { id: id },
      data: { ...updateProjectDto },
    });
  }

  async remove(id: number) {
    return await this.rsprisma.project.update({
      where: { id: id },
      data: { isArchived: true },
    });
  }

  async getBeneficiaryDetails(contract) {
    const beneficiaryData = await contract.getTotalBeneficiaries();
    return beneficiaryData;
  }

  async blockchainCall(blockchaindto: BlockchainProjectDto) {
    const { method, params } = blockchaindto;
    switch (method) {
      default:
        throw new Error('Method not found');
    }
  }

  async executeMetaTxRequest(params: any) {
    const { metaTxRequest } = params;
    const forwarderContract = await createContractInstanceSign(
      await getContractByName('ERC2771FORWARDER', this.rsprisma.setting),
      this.rsprisma.setting
    );

    metaTxRequest.gas = BigInt(metaTxRequest.gas);
    metaTxRequest.nonce = BigInt(metaTxRequest.nonce);
    metaTxRequest.value = BigInt(metaTxRequest.value);
    const tx = await forwarderContract.execute(metaTxRequest);

    const res = await tx.wait();
    return res;
  }

  async addAdmin(dto) {
    const { walletAddress } = dto;
    const c2cProject = await createContractInstanceSign(
      await getContractByName('ELProject', this.rsprisma.setting),
      this.rsprisma.setting
    );
    let donorTx;

    const rahatdonor = await createContractInstanceSign(
      await getContractByName('RahatDonor', this.rsprisma.setting),
      this.rsprisma.setting
    );

    const tx = await c2cProject.updateAdmin(walletAddress, true);
    if (tx.status === 1) donorTx = await rahatdonor.addOwner(walletAddress);
    return donorTx;
  }
}
