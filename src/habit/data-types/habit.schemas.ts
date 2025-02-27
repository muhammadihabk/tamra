import mongoose from 'mongoose';

export const habitLogModelName = 'habit_log';
export const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  is_yes_no: {
    type: Boolean,
  },
  is_shared: {
    type: Boolean,
  },
});

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
    habit_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    collection: habitLogModelName,
  },
);
