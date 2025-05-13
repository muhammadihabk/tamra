import userModel from './user.model';
import { IFindUserFilter, IDBUser } from './user.types';
import { handleDBErrors } from '../../common/errors';
import { User } from '../../config/gql/types';
import { Types } from 'mongoose';

async function create(user: IDBUser) {
  try {
    return await userModel.create(user);
  } catch (error: any) {
    handleDBErrors(error, 'User');
  }
}

async function findOne(filter: IFindUserFilter): Promise<IDBUser | null> {
  if (filter.id) {
    return await userModel.findById(filter.id).lean();
  }
  return await userModel.findOne({ email: filter.email }).lean();
}

async function findOneByHabitId(habitId: string): Promise<User | null> {
  let user: any = await userModel
    .findOne({ habits: { $elemMatch: { _id: new Types.ObjectId(habitId) } } })
    .lean();
  user._id = user._id.toString();

  return user;
}

export default {
  create,
  findOne,
  findOneByHabitId,
};
