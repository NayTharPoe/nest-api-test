import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type projectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
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

export const ProjectSchema = SchemaFactory.createForClass(Project);
