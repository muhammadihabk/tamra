import { handleDBErrors } from '../../common/errors';
import { ICreateHabitLogInput } from './habit-log.types';
import habitLogModel from './habit-log.model';
import habitInstanceRepository from '../habit-instance/habit-instance.repository';
import { Types } from 'mongoose';

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

async function findAll(habitId: string) {
  try {
    const habit = await habitInstanceRepository.findOne(habitId);
    if (!habit) {
      return null;
    }
    let interval = 86400000; // 1 day
    switch (habit.goal.repeat.interval) {
      case 'day':
        interval *= habit.goal.repeat.every;
        break;
      case 'week':
        interval *= habit.goal.repeat.every * 7;
        break;
      case 'month':
        interval *= habit.goal.repeat.every * 30;
        break;
    }
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate())
    );
    const scoreRange = 40;
    const scoreLowerDateBound = new Date(today);
    scoreLowerDateBound.setDate(today.getDate() - scoreRange);
    const projectionStreakAlgo = {
      $reduce: {
        input: '$streakLogs',
        initialValue: {
          currentStreak: 0,
          expectedDate: todayUTC,
        },
        in: {
          $let: {
            vars: {
              currentDate: '$$this.date',
              currentCount: '$$this.count',
              prev: '$$value',
            },
            in: {
              $cond: [
                {
                  $and: [
                    { $eq: ['$$currentDate', '$$prev.expectedDate'] }, // Check date matches
                    { $gte: ['$$currentCount', habit.goal.count] }, // Check goal met
                  ],
                },
                // Continue streak: increment and set next expected date
                {
                  currentStreak: { $add: ['$$prev.currentStreak', 1] },
                  expectedDate: {
                    $subtract: ['$$currentDate', interval],
                  },
                },
                // Break streak: retain current streak
                {
                  currentStreak: '$$prev.currentStreak',
                  expectedDate: '$$prev.expectedDate',
                },
              ],
            },
          },
        },
      },
    };
    const projectionScoreAlgo = { ...projectionStreakAlgo };
    projectionScoreAlgo.$reduce.input = '$scoreLogs';
    let result: any = await habitLogModel.aggregate([
      // 1. Filter logs for the habit
      { $match: { habitInstanceId: new Types.ObjectId(habitId) } },

      // 2. Sort logs by date (newest first)
      { $sort: { date: -1 } },

      // 3. Group logs into an array
      {
        $group: {
          _id: null,
          totalCount: {
            $sum: '$count',
          },
          streakLogs: {
            $push: {
              date: '$date',
              count: '$count',
            },
          },
          scoreLogs: {
            $push: {
              $cond: [
                {
                  $gte: ['$date', scoreLowerDateBound],
                },
                {
                  date: '$date',
                  count: '$count',
                },
                null,
              ],
            },
          },
        },
      },

      // 4. Calculate streak with dynamic interval
      {
        $project: {
          totalCount: '$totalCount',
          streak: projectionStreakAlgo,
          score: projectionScoreAlgo,
        },
      },

      // 5. Extract the streak value
      {
        $project: {
          totalCount: '$totalCount',
          streak: '$streak.currentStreak',
          score: { $multiply: ['$score.currentStreak', 2.5] },
        },
      },
    ]);

    return {
      totalCount: result[0].totalCount,
      streak: result[0].streak,
      score: result[0].score,
    };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default {
  create,
  findAll,
};
