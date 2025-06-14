import { handleDBErrors } from '../../common/errors';
import { ICreateHabitLogInput } from './habit-log.types';
import habitLogModel from './habit-log.model';
import habitInstanceRepository from '../habit-instance/habit-instance.repository';
import { Types } from 'mongoose';
import { RepeatInterval } from '../habit-instance/habit-instance.types';

async function create(habitLog: ICreateHabitLogInput) {
  try {
    const startOfDayUTC = new Date(
      Date.UTC(
        habitLog.date.getUTCFullYear(),
        habitLog.date.getUTCMonth(),
        habitLog.date.getUTCDate()
      )
    );

    const endOfDayExclusiveUTC = new Date(startOfDayUTC);
    endOfDayExclusiveUTC.setUTCDate(startOfDayUTC.getUTCDate() + 1);

    const query = {
      habitInstanceId: new Types.ObjectId(habitLog.habitInstanceId),
      date: {
        $gte: startOfDayUTC,
        $lt: endOfDayExclusiveUTC,
      },
    };

    const update = {
      $set: {
        ...habitLog,
      },
    };

    const options = {
      upsert: true,
      setDefaultsOnInsert: true,
    };

    await habitLogModel.findOneAndUpdate(query, update, options);
  } catch (error: any) {
    handleDBErrors(error, 'Habit');
  }
}

async function findAll(habitId: string) {
  try {
    const habit = await habitInstanceRepository.findOne(habitId);
    if (!habit) {
      return null;
    }

    // Check if there's a log for today
    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
    );

    const todayLog = await habitLogModel.findOne({
      habitInstanceId: new Types.ObjectId(habitId),
      date: {
        $gte: todayUTC,
      },
    });

    // If no log for today, return simplified response
    if (!todayLog) {
      const totalCount = await habitLogModel.aggregate([
        { $match: { habitInstanceId: new Types.ObjectId(habitId) } },
        { $group: { _id: null, totalCount: { $sum: '$count' } } },
      ]);

      return {
        totalCount: totalCount[0]?.totalCount || 0,
        streak: 0,
        score: 0,
      };
    }

    const repeatEvery = habit.goal.repeat.every;
    let repeatInterval: RepeatInterval = RepeatInterval.DAY;
    switch (habit.goal.repeat.interval) {
      case 'week':
        repeatInterval = RepeatInterval.WEEK;
        break;
      case 'month':
        repeatInterval = RepeatInterval.MONTH;
        break;
    }
    const scoreRange = 40;
    const scoreLowerDateBound = new Date(todayUTC).setDate(
      todayUTC.getDate() - scoreRange
    );

    const projectionStreakAlgo = {
      $reduce: {
        input: '$streakLogs',
        initialValue: {
          currentStreak: 0,
          expectedDate: todayUTC,
          continue: true,
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
                    '$$prev.continue',
                    {
                      // Check if log's date is within `repeat.every` range.
                      $and: [
                        {
                          $gte: [
                            {
                              $subtract: [
                                '$$prev.expectedDate',
                                '$$currentDate',
                              ],
                            },
                            0,
                          ],
                        },
                        {
                          $gte: [
                            '$$currentDate',
                            {
                              $dateSubtract: {
                                startDate: '$$currentDate',
                                unit: repeatInterval,
                                amount: repeatEvery,
                              },
                            },
                          ],
                        },
                      ],
                    },
                    {
                      $gte: ['$$currentCount', habit.goal.count],
                    },
                  ],
                },
                // Continue streak: increment and set next expected date
                {
                  currentStreak: {
                    $add: ['$$prev.currentStreak', 1],
                  },
                  expectedDate: {
                    $dateSubtract: {
                      startDate: '$$currentDate',
                      unit: repeatInterval,
                      amount: repeatEvery,
                    },
                  },
                },
                // Break streak: retain current streak
                {
                  currentStreak: '$$prev.currentStreak',
                  expectedDate: '$$prev.expectedDate',
                  continue: false,
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
      // Filter logs
      { $match: { habitInstanceId: new Types.ObjectId(habitId) } },

      {
        $addFields: {
          normalizedDate: {
            $dateTrunc: {
              date: '$date',
              unit: 'day',
              timezone: 'UTC',
            },
          },
        },
      },

      {
        $setWindowFields: {
          partitionBy: null,
          sortBy: {
            normalizedDate: 1,
          },
          output: {
            intervalTotalCount: {
              $sum: '$count',
              window: {
                range: [-(repeatEvery - 1), 0],
                unit: repeatInterval,
              },
            },
          },
        },
      },

      { $sort: { normalizedDate: -1 } },

      // Prepare arrays for $reduce
      {
        $group: {
          _id: null,
          totalCount: {
            $sum: '$count',
          },
          streakLogs: {
            $push: {
              date: '$normalizedDate',
              count: '$intervalTotalCount',
            },
          },
          scoreLogs: {
            $push: {
              $cond: [
                {
                  $gte: ['$date', scoreLowerDateBound],
                },
                {
                  date: '$normalizedDate',
                  count: '$intervalTotalCount',
                },
                null,
              ],
            },
          },
        },
      },

      {
        $project: {
          totalCount: '$totalCount',
          streak: projectionStreakAlgo,
          score: projectionScoreAlgo,
        },
      },

      {
        $project: {
          totalCount: '$totalCount',
          streak: '$streak.currentStreak',
          score: { $multiply: ['$score.currentStreak', 2.5] }, // (streak / 40) * 100
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

async function findOne(id: string) {
  try {
    return await habitLogModel.findById(id);
  } catch (error: any) {
    handleDBErrors(error, 'Habit Log');
  }
}

export default {
  create,
  findAll,
  findOne,
};
