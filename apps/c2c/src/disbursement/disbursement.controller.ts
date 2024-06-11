import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JOBS } from '@rahataid/c2c-extensions/constants';
import { DisbursementService } from './disbursement.service';
import {
  CreateDisbursementDto,
  DisbursementTransactionDto,
  UpdateDisbursementDto,
} from '@rahataid/c2c-extensions/dtos';

@Controller()
export class DisbursementController {
  constructor(private readonly disbursementService: DisbursementService) {}

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.CREATE,
    uuid: process.env.PROJECT_ID,
  })
  create(@Payload() createDisbursementDto: CreateDisbursementDto) {
    console.log({ createDisbursementDto });
    return this.disbursementService.create(createDisbursementDto);
  }

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.LIST,
    uuid: process.env.PROJECT_ID,
  })
  findAll() {
    return this.disbursementService.findAll();
  }

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.LISTONE,
    uuid: process.env.PROJECT_ID,
  })
  findOne(@Payload() payload: DisbursementTransactionDto) {
    return this.disbursementService.findOne(payload);
  }

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.UPDATE,
    uuid: process.env.PROJECT_ID,
  })
  update(@Payload() updateDisbursementDto: UpdateDisbursementDto) {
    return this.disbursementService.update(
      updateDisbursementDto.id,
      updateDisbursementDto
    );
  }

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.DISBURSEMENT_TRANSACTION,
    uuid: process.env.PROJECT_ID,
  })
  disbursementTransaction(@Payload() disbursementTransactinonDto) {
    return this.disbursementService.disbursementTransaction(
      disbursementTransactinonDto
    );
  }

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.DISBURSEMENT_APPROVAL,
    uuid: process.env.PROJECT_ID,
  })
  approvalTransaction(@Payload() disbursementApprovalDto) {
    return this.disbursementService.disbursementApprovals(
      disbursementApprovalDto
    );
  }
}
