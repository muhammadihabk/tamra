import { Injectable } from '@nestjs/common';
import { CreateHabitInput } from '../data-types/habit.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/data-types/user.schemas';

@Injectable()
export class HabitRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createHabitInput: CreateHabitInput) {
    const { userId, ...rest } = createHabitInput;
    await this.userModel.findByIdAndUpdate(new Types.ObjectId(userId), {
      $push: {
        habits: {
          ...rest,
        },
      },
    });
  }

  async findOne(habitId: string) {
    const habit = await this.userModel.findOne(
      {
        'habits._id': new Types.ObjectId(habitId),
      },
      {
        'habits.$': 1,
      },
    );

    return habit?.habits?.[0];
  }
}
