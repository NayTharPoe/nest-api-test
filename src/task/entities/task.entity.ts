import { Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TaskDocument = TaskEntity & Document;

export class TaskEntity extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  assignedEmployee: string;

  @Prop({ required: true })
  estimateHour: string;
  actualHour: string;
  status: number;
  estimateStartDate: string;
  estimateEndDate: string;
  actualStartDate: string;
  actualEndDate: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
