import { IsString } from 'class-validator';

export class CreateCampaignDto {
  @IsString()
  groupUID!: string;

  @IsString()
  message!: string;

  @IsString()
  name!: string;

  @IsString()
  transportId!: string;
}
