import { Resolvers, User } from '../../config/gql/types';
import userService from './user.service';

const resolvers: Resolvers = {
  Query: {
    user: (_, params) => {
      return findOne(params.id);
    },
  },
};

async function findOne(id: string): Promise<User | null> {
  return await userService.findOne(id);
}

export default {
  resolvers,
};
