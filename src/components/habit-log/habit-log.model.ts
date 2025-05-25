import mongoose, { Schema } from 'mongoose';
import { IHabitLog } from './habit-log.types';
import { habitInstanceCollection } from '../habit-instance/habit-instance.model';

const collection = 'habit_log';
const schema = new mongoose.Schema<IHabitLog>(
  {
    habitInstanceId: {
      type: Schema.Types.ObjectId,
      ref: habitInstanceCollection,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  {
    collection,
  }
);

schema.index({ habitInstanceId: 1, date: -1 });

const habitLogModel = mongoose.model(collection, schema);

export default habitLogModel;
