import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ _id: false })
@ObjectType()
class Repeat {
  @Prop({ default: undefined })
  @Field(() => [String], { nullable: true })
  on?: string[];

  @Prop({ required: true })
  @Field(() => Int)
  every: number;

  @Prop({ required: true })
  @Field()
  interval: 'day' | 'week' | 'month' | 'year';
}

@Schema({ _id: false })
@ObjectType()
class Goal {
  @Prop({ required: true })
  @Field()
  count: number;

  @Prop({ required: true })
  @Field()
  repeat: Repeat;

  @Prop({ required: true })
  @Field()
  reminder: string;
}

@Schema()
@ObjectType()
export class Habit {
  @Field()
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop()
  @Field({ name: 'isYesNo', nullable: true })
  is_yes_no?: boolean;

  @Prop({ required: true })
  @Field()
  goal: Goal;
}
export const HabitSchema = SchemaFactory.createForClass(Habit);

@Schema({ collection: 'habit_log' })
export class HabitLog {
  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  habitId: mongoose.Schema.Types.ObjectId;
}
export const HabitLogSchema = SchemaFactory.createForClass(HabitLog);
