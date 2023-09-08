import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { ProjectEntity } from 'src/project/entities/project.entity';
import { UserEntity } from 'src/user/entities/user.entity';

export type TaskDocument = TaskEntity & Document;

@Schema({ timestamps: true })
export class TaskEntity {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Types.ObjectId, ref: ProjectEntity.name })
  project: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: UserEntity.name })
  assignedEmployee: Types.ObjectId;

  @Prop()
  estimateHour: string;

  @Prop()
  status: number;

  @Prop()
  estimateStartDate: string;

  @Prop()
  estimateEndDate: string;

  @Prop()
  actualStartDate: string;

  @Prop()
  actualEndDate: string;

  @Prop()
  actualHour: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskEntity);
