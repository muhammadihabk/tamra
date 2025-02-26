import mongoose from 'mongoose';
import { userModelName } from 'src/user/data-shapes/user.schemas';

export const habitModelName = 'habit';
export const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    is_yes_no: {
      type: Boolean,
      required: true,
    },
  },
  {
    collection: habitModelName,
  },
);

export const habitLogModelName = 'habit_log';
export const habitLogSchema = new mongoose.Schema(
  {
    count: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModelName,
      required: true,
    },
    habit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: habitModelName,
      required: true,
    },
  },
  {
    collection: habitLogModelName,
  },
);
