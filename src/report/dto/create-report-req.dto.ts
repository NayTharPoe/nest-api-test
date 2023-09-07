import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReportDto {
  @IsNotEmpty()
  taskId: string;

  @IsString()
  taskTitle: string;

  @IsString()
  project: string;

  @IsNotEmpty()
  @IsString()
  percentage: string;

  @IsNotEmpty()
  @IsString()
  types: string;

  @IsNotEmpty()
  @IsNumber()
  status: number;

  @IsNotEmpty()
  @IsString()
  hour: string;
}
