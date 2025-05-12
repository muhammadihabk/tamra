import { GraphQLError } from 'graphql';
import { ValidationError } from '../../common/errors';
import {
  CreateHabitDefinitionInput,
  HabitDefinition,
  Resolvers,
} from '../../config/gql/types';
import HabitDefinitionService from './habit-definition.service';

const resolvers: Resolvers = {
  Mutation: {
    createHabitDefinition: (_, params) => {
      return create(params.createHabitDefinitionInput!);
    },
  },
};

async function create(
  input: CreateHabitDefinitionInput
): Promise<HabitDefinition | null> {
  try {
    const result = await HabitDefinitionService.create(input);
    if (!result) {
      return null;
    } else {
      return result;
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new GraphQLError(error.message);
    } else {
      throw error;
    }
  }
}

export default resolvers;
