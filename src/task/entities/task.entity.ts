import { Prop } from '@nestjs/mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from 'src/user/entities/user.entity';
export type TaskDocument = TaskEntity & Document;

export class TaskEntity extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: Types.ObjectId, ref: 'ProjectEntity', required: true })
  projectName: ProjectEntity;

  @Prop({ type: Types.ObjectId, ref: 'UserEntity', required: true })
  assignedEmployee: UserEntity;

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
