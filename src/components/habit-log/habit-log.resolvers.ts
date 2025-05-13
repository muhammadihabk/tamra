import { GraphQLError } from 'graphql';
import { ValidationError } from '../../common/errors';
import { GeneralResponse, Resolvers } from '../../config/gql/types';
import { ICreateHabitLogInput } from './habit-log.types';
import HabitLogService from './habit-log.service';
import UserService from '../user/user.service';

const resolvers: Resolvers = {
  Query: {
    habitStats: (_, params) => {
      return findAll(params.id);
    },
  },
  Mutation: {
    createHabitLog: async (_, params, { user }) => {
      let input: any = params.createHabitLogInput!;
      input.userId = user._id;
      return await create(input);
    },
  },
};

async function create(
  input: ICreateHabitLogInput
): Promise<GeneralResponse | null> {
  try {
    const user = await UserService.findOneByHabitId(input.habitInstanceId);
    if (user && user._id !== input.userId) {
      throw new GraphQLError('You are not the owner of this habit');
    }

    await HabitLogService.create(input);

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

async function findAll(habitId: string) {
  return await HabitLogService.findAll(habitId);
}

export default resolvers;
