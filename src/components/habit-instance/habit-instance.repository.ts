import { Types } from 'mongoose';
import { handleDBErrors } from '../../common/errors';
import userModel from '../user/user.model';
import { ICreateHabitInstanceInput } from './habit-instance.types';

async function create(habitInstance: ICreateHabitInstanceInput) {
  try {
    const { userId, ...rest } = habitInstance;
    await userModel.findByIdAndUpdate(new Types.ObjectId(userId), {
      $push: {
        habits: {
          ...rest,
        },
      },
    });
  } catch (error: any) {
    handleDBErrors(error, 'Habit');
  }
}

async function findOne(habitId: string) {
  const habit = await userModel.findOne(
    {
      'habits._id': new Types.ObjectId(habitId),
    },
    {
      'habits.$': 1,
    }
  );

  return habit?.habits?.[0];
}

export default {
  create,
  findOne,
};
