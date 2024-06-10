import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  // CreateDisbursementDto,
  UpdateDisbursementDto,
} from '@rahataid/c2c-extensions/dtos';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService } from '@rumsan/prisma';
import { randomUUID } from 'crypto';

@Injectable()
export class DisbursementService {
  private rsprisma;
  constructor(
    protected prisma: PrismaService,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy
  ) {}

  async create(createDisbursementDto: any) {
    try {
      const { amount, beneficiaries, from, transactionHash, type, timestamp } =
        createDisbursementDto;
      console.log({ createDisbursementDto });

      const result = await this.prisma.disbursementBeneficiary.create({
        data: {
          amount: parseFloat(amount),
          from: from as any,
          transactionHash,
          Beneficiary: {
            connectOrCreate: beneficiaries.map((address) => ({
              where: {
                walletAddress: address,
              },
            })),
          },
          Disbursement: {
            create: {
              uuid: randomUUID(),
              type,
              timestamp,
              amount: parseFloat(amount),
            },
          },
        },
      });
      console.log({ result });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    return await this.rsprisma.disbursement.findMany();
  }

  async findOne(id: number) {
    return await this.rsprisma.disbursement.findUnique({ where: { id: id } });
  }

  async update(id: number, updateDisbursementDto: UpdateDisbursementDto) {
    return await this.rsprisma.disbursement.update({
      where: { id: id },
      data: { ...updateDisbursementDto },
    });
  }

  async disbursementTransaction() {
    // Add logic here
  }

  async disbursementApproval() {
    // Add logic here
  }
}
