import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Habit, HabitSchema } from 'src/habit/data-types/habit.schemas';

@Schema({
  _id: false,
})
class Repeat {
  @Prop({ required: true })
  every?: number;

  @Prop()
  on?: string[];
}

@Schema({
  _id: false,
})
class Goal {
  @Prop({ required: true })
  count: number;

  @Prop({ required: true })
  repeat: Repeat;

  @Prop({ required: true })
  interval: 'day' | 'week' | 'month' | 'year';

  @Prop({ required: true })
  reminder: string;
}
const GoalSchema = SchemaFactory.createForClass(Goal);

@Schema({ collection: 'user' })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  picture?: string;

  @Prop([
    {
      habit: { type: HabitSchema, required: true },
      goal: { type: GoalSchema, required: true },
    },
  ])
  habits?: {
    habit: Habit;
    goal: Goal;
  }[];
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('validate', function (next) {
  const user = this as any;
  if (user.habits) {
    for (const habit of user.habits) {
      const { repeat } = habit.goal;
      const interval = habit.goal.interval;
      let isValid =
        typeof repeat.every === 'number' &&
        repeat.every > 0 &&
        repeat.every < 100;

      switch (interval) {
        case 'week':
          isValid =
            Array.isArray(repeat.on) &&
            repeat.on.every((day) =>
              ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day),
            );
          break;
        case 'month':
          isValid =
            Array.isArray(repeat.on) &&
            repeat.on.every((item) => {
              if (typeof item === 'number') {
                return item >= 1 && item <= 31; // Valid date
              }
              if (typeof item === 'string') {
                const validPatterns = [
                  'First',
                  'Second',
                  'Third',
                  'Fourth',
                  'Last',
                ];
                const validDays = [
                  'Sat',
                  'Sun',
                  'Mon',
                  'Tue',
                  'Wed',
                  'Thu',
                  'Fri',
                ];
                return (
                  item === 'Last day' ||
                  (validPatterns.some((pattern) => item.startsWith(pattern)) &&
                    validDays.some((day) => item.endsWith(day)))
                );
              }
              return false;
            });
          break;
        default:
          isValid = false;
      }

      if (!isValid) {
        const error = new Error(
          `Invalid repeat format for the given interval. User: ${user.name}, Repeat: ${JSON.stringify(
            repeat,
            null,
            2,
          )}`,
        );
        return next(error);
      }
    }
  }
  next();
});
