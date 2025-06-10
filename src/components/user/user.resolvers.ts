import { Resolvers, User } from '../../config/gql/types';
import UserService from './user.service';

const resolvers: Resolvers = {
  Query: {
    user: (_, params, { user }) => {
      const id = params.id || user._id;
      return findOne(id);
    },
    me: (_, __, { user }) => {
      return user._id;
    },
  },
};

async function findOne(id?: string): Promise<User | null> {
  if (!id) {
    return null; // Or throw an error, depending on desired behavior when no ID is provided
  }
  return await UserService.findOne({ id });
}

export default resolvers;
