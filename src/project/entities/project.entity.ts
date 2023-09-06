import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type projectDocument = HydratedDocument<Project>;

@Schema({ timestamps: true })
export class Project {
  @Prop()
  projectName: string;

  @Prop()
  language: string;

  @Prop()
  description: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
