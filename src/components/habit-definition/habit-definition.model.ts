import mongoose from 'mongoose';
import { IHabitDefinition } from './habit-definition.types';

const collection = 'habit_definition';
const habitSchema = new mongoose.Schema<IHabitDefinition>(
  {
    name: { type: String, required: true },
    is_shared: { type: Boolean, required: true },
  },
  {
    timestamps: true,
    collection,
  }
);

const habitModel = mongoose.model(collection, habitSchema);

export default habitModel;
