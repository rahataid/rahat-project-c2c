import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export type DisbursementBenefeciaryCreate = {
  amount: string;
  from: string;
  transactionHash: string;
  walletAddress: string;
};

export class CreateDisbursementDto {
  @ApiProperty({
    example: '0x1234567890',
  })
  from!: string;

  @ApiProperty({
    example: 100,
  })
  amount!: string;

  @ApiProperty({
    example: '0x1234567890',
  })
  transactionHash!: string;

  @ApiProperty({
    example: 'PENDING',
  })
  // useenum
  status!: any;

  @ApiProperty({
    example: '2021-10-01T00:00:00.000Z',
  })
  @IsString()
  @IsOptional()
  timestamp!: string;

  @ApiProperty({
    example: [
      {
        amount: '100',
        from: '0x1234567890',
        transactionHash: '0x1234567890',
        walletAddress: '0x1234567890',
      },
    ],
  })
  @IsArray()
  beneficiaries!: DisbursementBenefeciaryCreate[];
}

export class UpdateDisbursementDto {
  id!: number;
  amount!: number;
}

export class DisbursementApprovalsDTO {
  @ApiProperty({
    example: 1,
  })
  disbursementId!: number;
}

export class DisbursementTransactionDto {
  @ApiProperty({
    example: 1,
  })
  disbursementId!: number;
}
