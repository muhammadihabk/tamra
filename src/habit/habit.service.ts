import { Injectable } from '@nestjs/common';
import { HabitRepository } from './habit.repository';
import { CreateHabitInput } from './data-types/habit.types';

@Injectable()
export class HabitService {
  constructor(private habitRepository: HabitRepository) {}

  async create(createHabitInput: CreateHabitInput) {
    await this.habitRepository.create(createHabitInput);
  }
}
