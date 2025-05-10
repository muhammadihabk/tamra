import { Resolvers, User } from '../../config/gql/types';

const resolvers: Resolvers = {
  Query: {
    user: (_, params) => {
      console.log(params);
      return find();
    },
  },
};

async function find(): Promise<User> {
  return {
    _id: '1',
    email: 'mo@example.com',
    name: 'mo',
    picture: '<link>',
  };
}

export default {
  resolvers,
};
