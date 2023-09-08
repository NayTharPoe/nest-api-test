import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsNotEmpty()
  @IsString()
  readonly actualStartDate: string;

  @IsNotEmpty()
  @IsString()
  readonly actualEndDate: string;

  @IsNotEmpty()
  @IsString()
  readonly actualHour: string;
}
