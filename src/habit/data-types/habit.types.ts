import { Field, InputType, Int } from '@nestjs/graphql';

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
  user_id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  is_yes_no?: boolean;

  @Field()
  goal: GoalInput;
}
