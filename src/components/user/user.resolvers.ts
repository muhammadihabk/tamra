import { Resolvers, User } from '../../config/gql/types';
import UserService from './user.service';

const resolvers: Resolvers = {
  Query: {
    user: (_, params) => {
      return findOne(params.id);
    },
    me: (_, __, { user }) => {
      return user.id;
    },
  },
};

async function findOne(id: string): Promise<User | null> {
  return await UserService.findOne({ id });
}

export default resolvers;
