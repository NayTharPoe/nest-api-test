import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly projectName: string;

  @IsNotEmpty()
  @IsString()
  readonly assignedEmployee: string;

  @IsNotEmpty()
  @IsString()
  readonly estimateHour: string;

  readonly actualHour: string;

  @IsNumber()
  readonly status: number;

  readonly estimateStartDate: string;

  readonly estimateEndDate: string;

  readonly actualStartDate: string;

  readonly actualEndDate: string;
}
