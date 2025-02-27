import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { habitLogModelName, habitLogSchema } from './data-types/habit.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: habitLogModelName, schema: habitLogSchema },
    ]),
  ],
})
export class HabitModule {}
