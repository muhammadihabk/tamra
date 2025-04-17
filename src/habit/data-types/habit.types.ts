import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType()
export class RepeatInput {
  @Field(() => [String], { nullable: true })
  on?: string[];

  @Field(() => Int)
  every: number;

  @Field()
  interval: 'day' | 'week' | 'month' | 'year';
}

@InputType()
export class GoalInput {
  @Field()
  count: number;

  @Field()
  repeat: RepeatInput;

  @Field()
  reminder: string;
}

@InputType()
export class CreateHabitInput {
  userId: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  is_yes_no?: boolean;

  @Field()
  goal: GoalInput;
}

@InputType()
export class CreateHabitLogInput {
  @Field(() => Int)
  count: number;

  @Field()
  date: Date;

  @Field()
  habitId: string;
}

@InputType()
export class FindHabitLogsInput {
  @Field()
  habitId: string;
}

@ObjectType()
export class FindHabitLogsOutput {
  @Field(() => Int)
  totalCount: number;

  @Field(() => Int)
  streak: number;

  @Field(() => Int)
  score: number;
}
