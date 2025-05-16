import { Types } from 'mongoose';
import { handleDBErrors } from '../../common/errors';
import userModel from '../user/user.model';
import {
  ICreateHabitInstanceInput,
  IFindAllOptions,
  IHabitInstance,
} from './habit-instance.types';
import habitDefinitionModel from '../habit-definition/habit-definition.model';
import habitLogModel from '../habit-log/habit-log.model';

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

async function findAll(options: IFindAllOptions) {
  try {
    const { userId } = options;

    const user: any = await userModel
      .findOne({ _id: new Types.ObjectId(userId) }, { habits: 1 })
      .lean();

    const habitDefinitionIds =
      user?.habits.map(({ habitDefinitionId }: any) => habitDefinitionId) || [];

    const habitsDefinitions = await habitDefinitionModel.find({
      _id: { $in: habitDefinitionIds },
    });

    user?.habits.forEach((habit: any) => {
      const definition = habitsDefinitions.find((definition) =>
        definition._id.toString().includes(habit.habitDefinitionId)
      );
      if (definition) {
        habit.habitDefinition = definition;
      }
    });

    const habitInstancesIds = user?.habits.map(({ _id }: any) => _id);

    const logs = await habitLogModel.find({
      habitInstanceId: { $in: habitInstancesIds },
    });

    user?.habits.forEach((habit: any) => {
      const matchedLogs = logs.filter((log: any) =>
        log.habitInstanceId.toString().includes(habit._id)
      );
      if (matchedLogs.length) {
        habit.logs = matchedLogs;
      }
    });

    return user.habits;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  create,
  findOne,
  findAll,
};
