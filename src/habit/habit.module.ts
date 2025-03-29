import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitLog, HabitLogSchema } from './data-types/habit.schemas';
import { HabitResolvers } from './habit/habit.resolvers';
import { HabitService } from './habit/habit.service';
import { HabitRepository } from './habit/habit.repository';
import { User, UserSchema } from 'src/user/data-types/user.schemas';
import { HabitLogResolvers } from './habit-log/habit-log.resolvers';
import { HabitLogService } from './habit-log/habit-log.service';
import { HabitLogRepository } from './habit-log/habit-log.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: HabitLog.name, schema: HabitLogSchema },
    ]),
  ],
  providers: [
    HabitResolvers,
    HabitService,
    HabitRepository,
    HabitLogResolvers,
    HabitLogService,
    HabitLogRepository,
  ],
})
export class HabitModule {}
