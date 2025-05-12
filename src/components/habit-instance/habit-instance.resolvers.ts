import { GraphQLError } from 'graphql';
import { ValidationError } from '../../common/errors';
import { GeneralResponse, Resolvers } from '../../config/gql/types';
import HabitInstanceService from './habit-instance.service';
import { ICreateHabitInstanceInput } from './habit-instance.types';

const resolvers: Resolvers = {
  Mutation: {
    createHabitInstance: async (_, params, { user }) => {
      let input: any = params.createHabitInstanceInput!;
      input.userId = user._id;
      return await create(input);
    },
  },
};

async function create(
  input: ICreateHabitInstanceInput
): Promise<GeneralResponse | null> {
  try {
    await HabitInstanceService.create(input);

    return {
      message: 'Created',
    };
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new GraphQLError(error.message);
    } else {
      throw error;
    }
  }
}

export default resolvers;
