import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.schemas';
import { UserService } from '../user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('id') id: string): Promise<User | null> {
    return await this.userService.findOne(id);
  }
}
