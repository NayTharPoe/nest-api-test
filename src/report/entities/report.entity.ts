import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReportDocument = ReportEntity & Document;
@Schema({ timestamps: true })
export class ReportEntity extends Document {
  @Prop({ required: true })
  taskId: string;

  @Prop()
  taskTitle: string;

  @Prop()
  project: string;

  @Prop({ required: true })
  percentage: string;

  @Prop({ required: true })
  types: string;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  hour: string;
}

export const ReportSchema = SchemaFactory.createForClass(ReportEntity);
