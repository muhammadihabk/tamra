import { handleDBErrors } from '../../common/errors';
import { ICreateHabitLogInput } from './habit-log.types';
import habitLogModel from './habit-log.model';

async function create(habitLog: ICreateHabitLogInput) {
  try {
    const existingHabitLog: any = await findOne({
      date: habitLog.date,
    });

    if (existingHabitLog) {
      await habitLogModel.updateOne(
        { _id: existingHabitLog._id },
        { $set: habitLog }
      );

      return;
    }

    await habitLogModel.create(habitLog);
  } catch (error: any) {
    handleDBErrors(error, 'Habit');
  }
}

async function findOne(options: any) {
  const habit = await habitLogModel.findOne({
    date: new Date(options.date),
  });

  return habit;
}

export default {
  create,
};
