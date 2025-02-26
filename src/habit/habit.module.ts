import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  habitLogModelName,
  habitLogSchema,
  habitModelName,
  habitSchema,
} from './data-shapes/habit.schemas';
import { HabitRepository } from './habit.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: habitModelName, schema: habitSchema },
      {
        name: habitLogModelName,
        schema: habitLogSchema,
      },
    ]),
  ],
  providers: [HabitService, HabitRepository],
})
export class HabitModule {}
