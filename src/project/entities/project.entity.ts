import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type projectDocument = ProjectEntity & Document;

@Schema({ timestamps: true })
export class ProjectEntity extends Document {
  @Prop({ required: true })
  projectName: string;

  @Prop({ required: true })
  language: string;

  @Prop()
  description: string;

  @Prop()
  stack: string;

  @Prop({ required: true })
  startDate: string;

  @Prop({ required: true })
  endDate: string;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectEntity);
