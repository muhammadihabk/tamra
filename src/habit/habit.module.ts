import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HabitLog, habitLogSchema } from './data-types/habit.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: HabitLog.name, schema: habitLogSchema },
    ]),
  ],
})
export class HabitModule {}
