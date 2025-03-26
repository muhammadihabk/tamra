import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard } from 'config/auth/jwt-auth.guard';
import { User } from './data-types/user.schemas';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  @UseGuards(GqlJwtAuthGuard)
  async findOne(@Args('id') id: string): Promise<User | null> {
    return await this.userService.findOne({ id });
  }
}
