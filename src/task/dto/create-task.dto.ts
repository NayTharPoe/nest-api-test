import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTaskDto {

  readonly title: string;


  readonly description: string;


  readonly projectName: string;

  readonly assignedEmployee: string;

  readonly estimateHour: string;

  readonly actualHour: string;

  readonly status: number;

  readonly estimateStartDate: string;

  readonly estimateEndDate: string;

  readonly actualStartDate: string;

  readonly actualEndDate: string;
}
