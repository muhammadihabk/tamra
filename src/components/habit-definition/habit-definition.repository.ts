import { handleDBErrors } from '../../common/errors';
import { CreateHabitDefinitionInput } from '../../config/gql/types';
import habitModel from './habit-definition.model';

async function create(habitDefinition: CreateHabitDefinitionInput) {
  try {
    return await habitModel.create(habitDefinition);
  } catch (error: any) {
    handleDBErrors(error, 'Habit');
  }
}

export default {
  create,
};
