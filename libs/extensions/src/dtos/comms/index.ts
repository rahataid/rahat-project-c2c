import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCommsDto {
  constructor() {
    this.name = '';
    this.message = '';
    this.transportId = '';
  }

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  transportId: string;

  @IsString()
  @IsOptional()
  sessionId?: string;
}

export class ListCommDto {
  @IsString()
  @IsOptional()
  sort!: string;

  @IsString()
  @IsOptional()
  order!: 'asc' | 'desc';

  @IsNumber()
  page!: number;

  @IsNumber()
  perPage!: number;

  @IsString()
  @IsOptional()
  name?: string;
}

export class ListSessionLogsDto {
  @IsNumber()
  page!: number;

  @IsNumber()
  limit!: number;
}
