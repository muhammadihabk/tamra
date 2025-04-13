import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../config/auth/jwt-auth.guard';
import { HabitService } from './habit.service';
import { CreateHabitInput } from '../data-types/habit.types';
import { GeneralResponse } from 'src/common/general.types';

@Resolver()
export class HabitResolvers {
  constructor(private habitService: HabitService) {}

  @Mutation(() => GeneralResponse, { name: 'createHabit' })
  @UseGuards(GqlJwtAuthGuard)
  async create(
    @Args('createHabitInput') createHabitInput: CreateHabitInput,
    @Context() context,
  ) {
    createHabitInput.userId = context.req.user.id;
    await this.habitService.create(createHabitInput);

    return {
      isSuccessful: true,
    };
  }
}
