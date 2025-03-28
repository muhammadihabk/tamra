import { Injectable } from '@nestjs/common';
import { CreateHabitInput } from './data-types/habit.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/user/data-types/user.schemas';

@Injectable()
export class HabitRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createHabitInput: CreateHabitInput) {
    const { user_id, ...rest } = createHabitInput;
    await this.userModel.findByIdAndUpdate(
      new Types.ObjectId(user_id),
      {
        $push: {
          habits: {
            ...rest,
          },
        },
      },
    );
  }
}
