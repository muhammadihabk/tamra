import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Habit, habitSchema } from 'src/habit/data-types/habit.schemas';

@Schema({ collection: 'user' })
@ObjectType()
export class User {
  @Field()
  id: string;

  @Prop({ required: true })
  @Field()
  name: string;

  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  @Field()
  picture: string;

  @Prop({
    type: [habitSchema],
    default: undefined,
  })
  @Field(() => [Habit], { nullable: true })
  habits?: Habit[];
}
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('validate', function (next) {
  const user = this as any;
  if (user.habits) {
    for (const habit of user.habits) {
      const { repeat } = habit.goal;
      let isValid =
        typeof repeat.every === 'number' &&
        repeat.every > 0 &&
        repeat.every < 100;

      switch (repeat.interval) {
        case 'day':
          isValid = isValid && true;
          break;
        case 'week':
          isValid =
            isValid &&
            Array.isArray(repeat.on) &&
            repeat.on.every((day) =>
              ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(day),
            );
          break;
        case 'month':
          isValid =
            isValid &&
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
          )}`,
        );
        return next(error);
      }
    }
  }
  next();
});
