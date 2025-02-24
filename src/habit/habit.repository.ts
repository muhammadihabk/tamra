import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateHabit } from './data-shapes/habit.interfaces';
import { modelName } from './data-shapes/habit.schema';

@Injectable()
export class HabitRepository {
  constructor(@InjectModel(modelName) private habitModel: any) {}

  async create(createHabit: ICreateHabit) {
    let { isYesNo, ...newHabit } = createHabit;
    Object.assign(newHabit, { is_yes_no: isYesNo });
    const newDocument = await this.habitModel.create(newHabit);

    return newDocument.save();
  }
}
