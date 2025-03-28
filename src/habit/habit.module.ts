import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HabitLog,
  HabitLogSchema,
} from './data-types/habit.schemas';
import { HabitResolvers } from './habit.resolvers';
import { HabitService } from './habit.service';
import { HabitRepository } from './habit.repository';
import { User, UserSchema } from 'src/user/data-types/user.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: HabitLog.name, schema: HabitLogSchema },
    ]),
  ],
  providers: [HabitResolvers, HabitService, HabitRepository],
})
export class HabitModule {}
