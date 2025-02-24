import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { modelName, habitSchema } from './data-shapes/habit.schema';
import { HabitRepository } from './habit.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: modelName, schema: habitSchema }]),
  ],
  providers: [HabitService, HabitRepository],
})
export class HabitModule {}
