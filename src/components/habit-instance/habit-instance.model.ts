import mongoose, { Schema } from 'mongoose';
import {
  Goal,
  IHabitInstance,
  Repeat,
  RepeatInterval,
  RepeatOn,
} from './habit-instance.types';
import { collection as habitDefinitionCollection } from '../habit-definition/habit-definition.model';

const repeatSchema = new mongoose.Schema<Repeat>(
  {
    on: {
      type: [String],
      enum: Object.values(RepeatOn),
      validate: {
        validator: function (this: Repeat, days: string[]) {
          // Only require 'on' for weekly repeats
          return this.interval !== 'week' || (days && days.length > 0);
        },
        message: 'Weekly repeats require at least one day',
      },
    },
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
    reminder: {
      type: String,
      match: /^([1]?[0-2]|[1-9]):[0-5][0-9]$/, // H:MM format
      required: false,
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
