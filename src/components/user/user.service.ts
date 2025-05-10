import { User } from '../../config/gql/types';
import UserRepository from './user.repository';

async function findOne(id: string): Promise<User | null> {
  return await UserRepository.findOne(id);
}

export default {
  findOne,
};
