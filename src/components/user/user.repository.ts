import userModel from './user.model';
import { IFindUserFilter, IDBUser } from './user.types';
import { DuplicateKeyError } from '../../common/errors';

async function create(user: IDBUser) {
  try {
    return await userModel.create(user);
  } catch (error: any) {
    if (error.code === 11000) {
      throw new DuplicateKeyError('User already exists');
    }
  }
}

async function findOne(filter: IFindUserFilter): Promise<IDBUser | null> {
  if (filter.id) {
    return await userModel.findById(filter.id).lean();
  }
  return await userModel.findOne({ email: filter.email }).lean();
}

export default {
  create,
  findOne,
};
