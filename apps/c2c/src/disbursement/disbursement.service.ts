import { Injectable } from '@nestjs/common';
import {
  CreateDisbursementDto,
  UpdateDisbursementDto,
} from '@rahataid/c2c-extensions/dtos';
import { PrismaService } from '@rumsan/prisma';
@Injectable()
export class DisbursementService {
  private rsprisma;
  constructor(protected prisma: PrismaService) {
    this.rsprisma = prisma.rsclient;
  }

  async create(createDisbursementDto: CreateDisbursementDto) {
    console.log({ createDisbursementDto });
    return await this.rsprisma.disbursementbeneficiary.create({
      data: { createDisbursementDto },
    });
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
