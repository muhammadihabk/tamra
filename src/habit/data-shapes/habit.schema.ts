import mongoose from 'mongoose';

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
    collection: 'habit',
  },
);

export const modelName = 'habit';
