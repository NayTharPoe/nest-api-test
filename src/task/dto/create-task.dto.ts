import { IsNotEmpty, IsString,IsNumber } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsString()
  readonly project: string;

  @IsNotEmpty()
  @IsString()
  readonly assignedEmployee: string;

  @IsString()
  readonly estimateHour: string;

  @IsNotEmpty()
  @IsNumber()
  readonly status: number;

  @IsNotEmpty()
  @IsString()
  readonly estimateStartDate: string;

  @IsNotEmpty()
  @IsString()
  readonly estimateEndDate: string;
}
