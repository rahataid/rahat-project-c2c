// import { IsString, IsNotEmpty, IsNumber, IsArray, IsOptional } from 'class-validator';
export class CreateProjectDto {
  name!: string;
  location!: string;
  description?: string;
}
