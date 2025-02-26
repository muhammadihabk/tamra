import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateHabit } from './data-shapes/habit.interfaces';
import { habitModelName } from './data-shapes/habit.schemas';

@Injectable()
export class HabitRepository {
  constructor(@InjectModel(habitModelName) private habitModel: any) {}

  async create(createHabit: ICreateHabit) {
    let { isYesNo, ...newHabit } = createHabit;
    Object.assign(newHabit, { is_yes_no: isYesNo });
    const newDocument = await this.habitModel.create(newHabit);

    return newDocument.save();
  }
}
