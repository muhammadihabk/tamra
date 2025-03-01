import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  _id: false,
})
export class Habit {
  @Prop({ required: true })
  name: string;

  is_yes_no?: boolean;

  is_shared?: boolean;
}
export const HabitSchema = SchemaFactory.createForClass(Habit);

@Schema({
  collection: 'habit_log',
})
export class HabitLog {
  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  habit_id: mongoose.Schema.Types.ObjectId;
}
export const HabitLogSchema = SchemaFactory.createForClass(HabitLog);
