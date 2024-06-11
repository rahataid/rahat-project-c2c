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

      // Create disbursement first
      const disbursement = await this.prisma.disbursement.create({
        data: {
          uuid: randomUUID(),
          type,
          timestamp,
          amount: parseFloat(amount),
        },
      });

      // Create or connect beneficiaries to the disbursement
      const result = await Promise.all(
        beneficiaries.map(async (address: string) => {
          const disbursementBeneficiary =
            await this.prisma.disbursementBeneficiary.create({
              include: {
                Beneficiary: true,
                Disbursement: true,
              },
              data: {
                amount: parseFloat(amount),
                from: from,
                transactionHash,
                Disbursement: {
                  connect: {
                    id: disbursement.id,
                  },
                },
                Beneficiary: {
                  connect: {
                    walletAddress: address,
                  },
                },
              },
            });
          return disbursementBeneficiary;
        })
      );

      console.log({ result });
      return result;
    } catch (error) {
      console.log(error);
      throw error; // It's a good practice to rethrow the error or handle it appropriately
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
