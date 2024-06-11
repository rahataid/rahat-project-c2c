import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DisbursementStatus, Prisma } from '@prisma/client';
import {
  DisbursementApprovalsDTO,
  CreateDisbursementDto,
  UpdateDisbursementDto,
  DisbursementTransactionDto,
  DisbursementBenefeciaryCreate,
} from '@rahataid/c2c-extensions/dtos';
import { ProjectContants } from '@rahataid/sdk';
import { PrismaService, paginator } from '@rumsan/prisma';
import { randomUUID } from 'crypto';

const paginate = paginator({ perPage: 20 });

@Injectable()
export class DisbursementService {
  private rsprisma;
  constructor(
    protected prisma: PrismaService,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy
  ) { }

  async create(createDisbursementDto: CreateDisbursementDto) {
    try {
      const { amount, beneficiaries, from, transactionHash, status, timestamp } =
        createDisbursementDto;
      console.log({ createDisbursementDto });

      // Create disbursement first
      const disbursement = await this.prisma.disbursement.create({
        data: {
          uuid: randomUUID(),
          status,
          timestamp,
          amount: parseFloat(amount),
          transactionHash,
        },
      });

      // Create or connect beneficiaries to the disbursement
      const result = await Promise.all(
        beneficiaries.map(async (ben: DisbursementBenefeciaryCreate) => {
          const disbursementBeneficiary =
            await this.prisma.disbursementBeneficiary.create({
              include: {
                Beneficiary: true,
                Disbursement: true,
              },
              data: {
                amount: parseFloat(amount),
                from,
                transactionHash,
                Disbursement: {
                  connect: {
                    id: disbursement.id,
                  },
                },
                Beneficiary: {
                  connect: {
                    walletAddress: ben.walletAddress,
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
    const where: Prisma.DisbursementBeneficiaryWhereInput = {};
    const include: Prisma.DisbursementBeneficiaryInclude = {
      Beneficiary: true,
      Disbursement: true,
    };

    return paginate(
      this.prisma.disbursementBeneficiary,
      { where, include },
      {
        page: 1,
        perPage: 20,
      }
    );
  }

  async findOne(id: number) {
    return await this.rsprisma.disbursement.findUnique({ where: { id: id } });
  }

  async update(id: number, updateDisbursementDto: UpdateDisbursementDto) {
    return await this.rsprisma.disbursement.update({
      where: { id },
      data: { ...updateDisbursementDto },
    });
  }

  async disbursementTransaction(disbursementDto: DisbursementTransactionDto) {
    const where: Prisma.DisbursementBeneficiaryWhereInput = {
      Disbursement: {
        uuid: disbursementDto.disbursementUUID,
      },
    };
    const include: Prisma.DisbursementBeneficiaryInclude = {
      Beneficiary: true,
      Disbursement: {
        select: {
          status: true,
          createdAt: true,
          amount: true,
          type: true,
        },
      },
    };

    return paginate(
      this.prisma.disbursementBeneficiary,
      { where, include },
      {
        page: 1,
        perPage: 20,
      }
    );
  }

  async disbursementApprovals(disbursementDto: DisbursementApprovalsDTO) {
    const where: Prisma.DisbursementBeneficiaryWhereInput = {
      Disbursement: {
        uuid: disbursementDto.disbursementUUID,
        status: {
          equals: DisbursementStatus.COMPLETED,
        },
      },
    };
    const include: Prisma.DisbursementBeneficiaryInclude = {
      Beneficiary: true,
      Disbursement: true,
    };

    return paginate(
      this.prisma.disbursementBeneficiary,
      { where, include },
      {
        page: 1,
        perPage: 20,
      }
    );
  }
}
