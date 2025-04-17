import { Injectable } from '@nestjs/common';
import { HabitLogRepository } from './habit-log.repository';
import {
  CreateHabitLogInput,
  FindHabitLogsInput,
} from '../data-types/habit.types';

@Injectable()
export class HabitLogService {
  constructor(private habitLogRepository: HabitLogRepository) {}

  async create(createHabitLogInput: CreateHabitLogInput) {
    await this.habitLogRepository.create(createHabitLogInput);
  }

  async findAll(findHabitLogsInput: FindHabitLogsInput) {
    return await this.habitLogRepository.findAll(findHabitLogsInput);
  }
}
