import { CreateHabitDefinitionInput, HabitDefinition } from '../../config/gql/types';
import HabitDefinitionRepository from './habit-definition.repository';

async function create(data: CreateHabitDefinitionInput) {
  try {
    return await HabitDefinitionRepository.create(data);
  } catch (error) {
    throw error;
  }
}

async function findAll(): Promise<HabitDefinition[] | []> {
  try {
    return await HabitDefinitionRepository.findAll();
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  findAll,
};
