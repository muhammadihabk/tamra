import { handleDBErrors } from '../../common/errors';
import {
  CreateHabitDefinitionInput,
  HabitDefinition,
} from '../../config/gql/types';
import habitDefinitionModel from './habit-definition.model';

async function create(habitDefinition: CreateHabitDefinitionInput) {
  try {
    return await habitDefinitionModel.create(habitDefinition);
  } catch (error: any) {
    handleDBErrors(error, 'Habit');
  }
}

async function findAll(): Promise<HabitDefinition[] | []> {
  try {
    return (await habitDefinitionModel.find()) ?? [];
  } catch (error: any) {
    handleDBErrors(error, 'Habit');
    return [];
  }
}

export default {
  create,
  findAll,
};
