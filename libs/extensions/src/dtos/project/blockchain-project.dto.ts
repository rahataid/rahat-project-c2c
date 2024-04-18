import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BlockchainProjectDto {
  @IsString()
  @IsNotEmpty()
  method!: string;

  @IsArray()
  params!: any[];
}

export class ProjectActionDto {
  @IsString()
  @IsNotEmpty()
  method!: string;

  @IsArray()
  params!: object;
}
