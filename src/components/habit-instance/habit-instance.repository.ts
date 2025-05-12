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

export default {
  create,
};
