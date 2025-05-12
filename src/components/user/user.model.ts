import mongoose from 'mongoose';
import { IDBUser } from './user.types';

const collection = 'user';
const userSchema = new mongoose.Schema<IDBUser>(
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
  },
  {
    timestamps: true,
    collection,
  }
);

const userModel = mongoose.model(collection, userSchema);

export default userModel;
