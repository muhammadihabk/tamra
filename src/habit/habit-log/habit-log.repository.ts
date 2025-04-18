import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {
  CreateHabitLogInput,
  FindHabitLogsInput,
} from '../data-types/habit.types';
import { HabitLog } from '../data-types/habit.schemas';
import { HabitRepository } from '../habit/habit.repository';

@Injectable()
export class HabitLogRepository {
  constructor(
    @InjectModel(HabitLog.name) private habitLogModel: Model<HabitLog>,
    private habitRepository: HabitRepository,
  ) {}

  async create(createHabitLogInput: CreateHabitLogInput) {
    const existingHabitLog: any = await this.findOne({
      date: createHabitLogInput.date,
    });

    if (existingHabitLog) {
      await this.habitLogModel.updateOne(
        { _id: existingHabitLog._id },
        { $set: createHabitLogInput },
      );

      return;
    }

    await this.habitLogModel.create(createHabitLogInput);
  }

  async findOne(options: any) {
    const habit = await this.habitLogModel.findOne({
      date: new Date(options.date),
    });

    return habit;
  }

  async findAll(findHabitLogsInput: FindHabitLogsInput) {
    const { habitId } = findHabitLogsInput;

    const habit = await this.habitRepository.findOne(habitId);
    if (!habit) {
      return null;
    }
    let interval = 86400000;
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
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
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
    let result: any = await this.habitLogModel.aggregate([
      // 1. Filter logs for the habit
      { $match: { habitId: new Types.ObjectId(habitId) } },

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

    result = {
      totalCount: result[0].totalCount,
      streak: result[0].streak,
      score: result[0].score,
    };

    return result;
  }
}
