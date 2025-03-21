import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { DisbursementStatus, DisbursementType, Prisma } from '@prisma/client';
import { EVENTS } from '@rahataid/c2c-extensions';
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
import { handleMicroserviceCall } from '../utils/handleMicroserviceCall';
import { Decimal } from '@prisma/client/runtime/library';

const paginate = paginator({ perPage: 20 });

@Injectable()
export class DisbursementService {
  private rsprisma;
  constructor(
    protected prisma: PrismaService,
    @Inject(ProjectContants.ELClient) private readonly client: ClientProxy,
    private eventEmitter: EventEmitter2
  ) {}

  async create(createDisbursementDto: CreateDisbursementDto) {
    try {
      const {
        amount,
        beneficiaries,
        from,
        transactionHash,
        status,
        timestamp,
        type,
      } = createDisbursementDto;

      // Create disbursement
      const disbursement = await this.prisma.disbursement.create({
        data: {
          uuid: randomUUID(),
          status,
          timestamp,
          amount: beneficiaries
            .reduce((acc, curr) => acc + parseFloat(curr.amount), 0)
            .toString(),
          transactionHash,
          type,
        },
      });

      // Create or connect beneficiaries to the disbursement
      const result = await Promise.all(
        beneficiaries.map(async (ben: DisbursementBenefeciaryCreate) => {
          const disbursementBeneficiary =
            await this.prisma.disbursementBeneficiary.upsert({
              where: {
                disbursementId_beneficiaryWalletAddress: {
                  disbursementId: disbursement.id,
                  beneficiaryWalletAddress: ben.walletAddress,
                },
              },
              update: {
                amount: amount.toString(),
                from,
                transactionHash,
              },
              create: {
                amount: amount.toString(),
                from,
                transactionHash,
                Disbursement: {
                  connect: { id: disbursement.id },
                },
                Beneficiary: {
                  connect: { walletAddress: ben.walletAddress },
                },
              },
              include: {
                Beneficiary: true,
                Disbursement: true,
              },
            });
          if (
            disbursementBeneficiary.Disbursement.type ===
            DisbursementType.PROJECT
          ) {
            await handleMicroserviceCall({
              client: this.client.send(
                { cmd: 'rahat.jobs.projects.send_disbursement_created_email' },
                {
                  walletAddress:
                    disbursementBeneficiary.beneficiaryWalletAddress,
                  amount: disbursementBeneficiary.amount,
                }
              ),
              onSuccess(response) {
                console.log('Email sent', response);
                return response;
              },
              onError(error) {
                console.log('Sending email failed: ' + error.message);
              },
            });
          }

          return disbursementBeneficiary;
        })
      );

      this.eventEmitter.emit(EVENTS.DISBURSEMENT_CREATE, {});

      console.log({ result });
      return disbursement;
    } catch (error) {
      console.log(error);
      throw error; // Re-throw the error for better debugging
    }
  }

  async findAll() {
    const where: Prisma.DisbursementWhereInput = {};
    const include: Prisma.DisbursementInclude = {
      DisbursementBeneficiary: true,
    };
    const orderBy: Prisma.DisbursementOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    return paginate(
      this.prisma.disbursement,
      { where, include, orderBy },
      {
        page: 1,
        perPage: 20,
      }
    );
  }

  async findOne(params: DisbursementTransactionDto) {
    const disbursement = await this.prisma.disbursement.findUnique({
      where: {
        uuid: params.disbursementUUID,
      },
      include: {
        DisbursementBeneficiary: true,
        _count: {
          select: {
            DisbursementBeneficiary: true,
          },
        },
      },
    });

    return disbursement;
  }

  async update(id: number, updateDisbursementDto: UpdateDisbursementDto) {
    try {
      const disbursement = await this.prisma.disbursement.update({
        where: { id },
        data: { ...updateDisbursementDto },
      });

      if (
        disbursement.type === DisbursementType.MULTISIG &&
        disbursement.status === DisbursementStatus.COMPLETED
      ) {
        const beneficiary = await this.prisma.disbursementBeneficiary.findFirst(
          {
            where: {
              disbursementId: id,
            },
          }
        );
        await handleMicroserviceCall({
          client: this.client.send(
            { cmd: 'rahat.jobs.projects.send_disbursement_created_email' },
            {
              walletAddress: beneficiary.beneficiaryWalletAddress,
              amount: disbursement.amount,
            }
          ),
          onSuccess(response) {
            console.log('Email sent', response);
            return response;
          },
          onError(error) {
            console.log('Sending email failed: ' + error.message);
          },
        });
      }

      return disbursement;
    } catch (error) {
      console.log(error);
      throw error;
    }
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
    const orderBy: Prisma.DisbursementBeneficiaryOrderByWithAggregationInput = {
      createdAt: 'desc',
    };

    return paginate(
      this.prisma.disbursementBeneficiary,
      { where, include, orderBy },
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
