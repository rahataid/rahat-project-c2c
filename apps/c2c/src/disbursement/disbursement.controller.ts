import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JOBS } from '@rahataid/c2c-extensions/constants';
import { DisbursementService } from './disbursement.service';
import {
  CreateDisbursementDto,
  UpdateDisbursementDto,
} from '@rahataid/c2c-extensions/dtos';

@Controller()
export class DisbursementController {
  constructor(private readonly disbursementService: DisbursementService) {}

  @MessagePattern({ cmd: JOBS.DISBURSEMENT.CREATE })
  create(@Payload() createDisbursementDto: CreateDisbursementDto) {
    console.log({ createDisbursementDto });
    return this.disbursementService.create(createDisbursementDto);
  }

  @MessagePattern({ cmd: JOBS.DISBURSEMENT.LIST })
  findAll() {
    return this.disbursementService.findAll();
  }

  @MessagePattern({ cmd: JOBS.DISBURSEMENT.LISTONE })
  findOne(@Payload() id: number) {
    return this.disbursementService.findOne(id);
  }

  @MessagePattern({ cmd: JOBS.DISBURSEMENT.UPDATE })
  update(@Payload() updateDisbursementDto: UpdateDisbursementDto) {
    return this.disbursementService.update(
      updateDisbursementDto.id,
      updateDisbursementDto
    );
  }

  @MessagePattern({ cmd: JOBS.DISBURSEMENT.DISBURSEMENT_TRANSACTION })
  disbursementTransaction(@Payload() disbursementTransactinonDto) {
    return this.disbursementService.disbursementTransaction();
  }

  @MessagePattern({ cmd: JOBS.DISBURSEMENT.DISBURSEMENT_APPROVAL })
  approvalTransaction(@Payload() disbursementApprovalDto) {
    return this.disbursementService.disbursementApproval();
  }
}
