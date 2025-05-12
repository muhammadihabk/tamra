import mongoose from 'mongoose';
import { IDBUser } from './user.types';
import habitInstanceSchema from '../habit-instance/habit-instance.model';

const collection = 'user';
const schema = new mongoose.Schema<IDBUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    picture: String,
    habits: { type: [habitInstanceSchema], default: [] },
  },
  {
    timestamps: true,
    collection,
  }
);

const userModel = mongoose.model(collection, schema);

export default userModel;
