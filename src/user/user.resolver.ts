import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { FindUserResponse } from './data-types/user.types';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'config/auth/jwt-auth.guard';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => FindUserResponse, { name: 'user', nullable: true })
  @UseGuards(GqlJwtAuthGuard)
  async findOne(@Args('id') id: string): Promise<FindUserResponse | null> {
    return await this.userService.findOne({ id });
  }
}
