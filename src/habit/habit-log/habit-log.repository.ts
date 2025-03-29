import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHabitLogInput } from '../data-types/habit.types';
import { HabitLog } from '../data-types/habit.schemas';

@Injectable()
export class HabitLogRepository {
  constructor(
    @InjectModel(HabitLog.name) private habitLogModel: Model<HabitLog>,
  ) {}

  async create(createHabitLogInput: CreateHabitLogInput) {
    await this.habitLogModel.create(createHabitLogInput);
  }
}
