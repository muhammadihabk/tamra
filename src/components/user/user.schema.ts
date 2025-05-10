import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    salt: String,
    hash: String,
    picture: String,
  },
  {
    timestamps: true,
    collection: 'user',
  }
);

const userModel = mongoose.model('user', userSchema);

export default userModel;
