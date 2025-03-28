import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'config/auth/jwt-auth.guard';
import { HabitService } from './habit.service';
import { CreateHabitInput } from './data-types/habit.types';
import { UpdateResponse } from 'src/general-types/general-types.types';

@Resolver()
export class HabitResolvers {
  constructor(private habitService: HabitService) {}

  @Mutation(() => UpdateResponse, { name: 'createHabit' })
  @UseGuards(GqlJwtAuthGuard)
  async create(
    @Args('createHabitInput') createHabitInput: CreateHabitInput,
    @Context() context,
  ) {
    createHabitInput.user_id = context.req.user.id;
    await this.habitService.create(createHabitInput);

    return {
      isSuccessful: true,
    };
  }
}
