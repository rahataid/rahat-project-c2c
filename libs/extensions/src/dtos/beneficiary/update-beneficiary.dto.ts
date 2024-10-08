import { PartialType } from '@nestjs/mapped-types';
import { CreateBeneficiaryDto } from './create-beneficiary.dto';

export class UpdateBeneficiaryDto extends PartialType(CreateBeneficiaryDto) {
  id!: number;
}

export class VerifyWalletDto {
  walletAddress!: string;
}
