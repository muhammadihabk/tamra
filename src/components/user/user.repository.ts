import { Types } from 'mongoose';
import { User } from '../../config/gql/types';
import userModel from './user.schema';

async function findOne(id: string): Promise<User | null> {
  return await userModel.findOne({ _id: new Types.ObjectId(id) });
}

export default {
  findOne,
};
