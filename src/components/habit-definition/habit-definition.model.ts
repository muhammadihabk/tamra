import mongoose from 'mongoose';
import { IHabitDefinition } from './habit-definition.types';

const collection = 'habit_definition';
const schema = new mongoose.Schema<IHabitDefinition>(
  {
    name: { type: String, required: true },
    is_shared: { type: Boolean, required: true },
  },
  {
    collection,
    timestamps: true,
  }
);

const habitDefinitionModel = mongoose.model(collection, schema);

export default habitDefinitionModel;
export { collection };
