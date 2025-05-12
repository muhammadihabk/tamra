import { handleDBErrors } from '../../common/errors';
import { CreateHabitDefinitionInput } from '../../config/gql/types';
import habitDefinitionModel from './habit-definition.model';

async function create(habitDefinition: CreateHabitDefinitionInput) {
  try {
    return await habitDefinitionModel.create(habitDefinition);
  } catch (error: any) {
    handleDBErrors(error, 'Habit');
  }
}

export default {
  create,
};
