import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from '../../config/auth/jwt-auth.guard';
import { HabitLogService } from './habit-log.service';
import {
  CreateHabitLogInput,
  FindHabitLogsInput,
  FindHabitLogsOutput,
} from '../data-types/habit.types';
import { GeneralResponse } from 'src/common/data-types/general.types';
import { UserService } from 'src/user/user.service';

@Resolver()
export class HabitLogResolvers {
  constructor(
    private habitLogService: HabitLogService,
    private userService: UserService,
  ) {}

  @Mutation(() => GeneralResponse, { name: 'createHabitLog' })
  @UseGuards(GqlJwtAuthGuard)
  async create(
    @Args('createHabitLogInput') createHabitLogInput: CreateHabitLogInput,
    @Context() context,
  ): Promise<GeneralResponse> {
    const inUserId = context.req.user.id;
    const user = await this.userService.findOneByHabitId(
      createHabitLogInput.habitId,
    );
    if (!user) {
      return {
        isSuccessful: false,
        message: 'User not found',
      };
    }
    if (user.id !== inUserId) {
      return {
        isSuccessful: false,
        message: 'User does not have permission to log this habit',
      };
    }
    await this.habitLogService.create(createHabitLogInput);

    return {
      isSuccessful: true,
    };
  }

  @Query(() => FindHabitLogsOutput, { name: 'habitLogs' })
  @UseGuards(GqlJwtAuthGuard)
  async findAll(
    @Args('findHabitLogsInput')
    findHabitLogsInput: FindHabitLogsInput,
  ) {
    return await this.habitLogService.findAll(findHabitLogsInput);
  }
}
