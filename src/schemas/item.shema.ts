import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ItemDocument = HydratedDocument<Item>;

@Schema({ timestamps: true })
export class Item {
  @Prop()
  name: string;

  @Prop()
  desc: string;

  @Prop()
  qty: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
