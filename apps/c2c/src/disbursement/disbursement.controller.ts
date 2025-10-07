import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JOBS } from '@rahataid/c2c-extensions/constants';
import { DisbursementService } from './disbursement.service';
import {
  CreateDisbursementDto,
  DisbursementTransactionDto,
  ListDisbursementDto,
  UpdateDisbursementDto,
} from '@rahataid/c2c-extensions/dtos';
import { DisbursementMultisigService } from './disbursement.multisig.service';

@Controller()
export class DisbursementController {
  constructor(
    private readonly disbursementService: DisbursementService,
    private readonly disbursementMultisigService: DisbursementMultisigService
  ) {}

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.CREATE,
    uuid: process.env.PROJECT_ID,
  })
  create(@Payload() createDisbursementDto: any) {
    return this.disbursementService.create(createDisbursementDto);
  }

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.LIST,
    uuid: process.env.PROJECT_ID,
  })
  findAll(query: ListDisbursementDto) {
    return this.disbursementService.findAll(query);
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
  update(@Payload() updateDisbursementDto: any) {
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

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.GET_PENDING_DISBURSEMENT,
    uuid: process.env.PROJECT_ID,
  })
  pendingTransaction() {
    return this.disbursementService.disbursementPending();
  }

  @MessagePattern({
    cmd: JOBS.SAFE_TRANSACTION.CREATE,
    uuid: process.env.PROJECT_ID,
  })
  createSafeTransaction(@Payload() payload) {
    return this.disbursementMultisigService.createSafeTransaction(payload);
  }

  @MessagePattern({
    cmd: JOBS.SAFE_TRANSACTION.GET,
    uuid: process.env.PROJECT_ID,
  })
  getSafeApprovals(@Payload() payload) {
    return this.disbursementMultisigService.getTransactionApprovals(
      payload.transactionHash
    );
  }

  @MessagePattern({
    cmd: JOBS.SAFE_TRANSACTION.GET_PENDING,
    uuid: process.env.PROJECT_ID,
  })
  getPendingSafeTransactions() {
    return this.disbursementMultisigService.getSafePendingTransactions();
  }

  @MessagePattern({
    cmd: JOBS.SAFE_TRANSACTION.GET_OWNERS,
    uuid: process.env.PROJECT_ID,
  })
  getOwnersList() {
    return this.disbursementMultisigService.getOwnersList();
  }

  @MessagePattern({
    cmd: JOBS.DISBURSEMENT.DISBURSEMENT_BALANCE_CHART,
    uuid: process.env.PROJECT_ID,
  })
  getDisbursementSafeBalanceChart() {
    return this.disbursementMultisigService.getDisbursementSafeBalanceChart();
  }
}
