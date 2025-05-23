import mongoose, { Schema } from 'mongoose';
import {
  Goal,
  IHabitInstance,
  MonthRepeatOn,
  Repeat,
  RepeatInterval,
  WeekRepeatOn,
} from './habit-instance.types';
import { collection as habitDefinitionCollection } from '../habit-definition/habit-definition.model';

const repeatOnValues = [
  ...Object.values(WeekRepeatOn),
  ...Object.values(MonthRepeatOn),
];
const repeatSchema = new mongoose.Schema<Repeat>(
  {
    every: {
      type: Number,
      min: 1,
      default: 1,
    },
    interval: {
      type: String,
      enum: Object.values(RepeatInterval),
      required: true,
    },
    on: {
      type: [String],
      enum: repeatOnValues,
      validate: {
        validator: function (this: Repeat, on: any[]) {
          if (this.interval === 'day') {
            return this.on === undefined || this.on.length === 0;
          }

          let condition = on && on.length > 0;
          if (this.interval === 'week') {
            condition =
              condition &&
              on.every((v) => Object.values(WeekRepeatOn).includes(v)) &&
              !on.every((v) => Object.values(MonthRepeatOn).includes(v));
          }
          if (this.interval === 'month') {
            condition =
              condition &&
              on.every((v) => Object.values(MonthRepeatOn).includes(v)) &&
              !on.every((v) => Object.values(WeekRepeatOn).includes(v));
          }

          return condition;
        },
        message: 'Invalid on values',
      },
    },
    at: {
      type: String,
      match: /^([1]?[0-2]|[1-9]):[0-5][0-9]$/, // H:MM format
      required: false,
    },
  },
  { _id: false }
);

const goalSchema = new mongoose.Schema<Goal>(
  {
    count: {
      type: Number,
      required: true,
      min: 1,
    },
    repeat: {
      type: repeatSchema,
      required: true,
    },
  },
  { _id: false }
);

const habitInstanceCollection = 'habit_instance';
const habitInstanceSchema = new mongoose.Schema<IHabitInstance>(
  {
    habitDefinitionId: {
      type: Schema.Types.ObjectId,
      ref: habitDefinitionCollection,
      required: true,
    },
    goal: {
      type: goalSchema,
      required: true,
    },
  },
  {
    collection: habitInstanceCollection,
    timestamps: true,
  }
);

export default habitInstanceSchema;
export { habitInstanceCollection };
