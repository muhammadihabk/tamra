import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './data-shapes/habit.dtos';
import { ICreateHabit } from './data-shapes/habit.interfaces';
import { HabitRepository } from './habit.repository';

@Injectable()
export class HabitService {
  constructor(private habitRepository: HabitRepository) {}

  async create(createHabitDto: CreateHabitDto) {
    const newHabit: ICreateHabit = createHabitDto;

    return this.habitRepository.create(newHabit);
  }
}
