import { CreateHabitDefinitionInput } from "../../config/gql/types";
import HabitDefinitionRepository from "./habit-definition.repository";

async function create(data: CreateHabitDefinitionInput) {
  try {
    return await HabitDefinitionRepository.create(data);
  } catch (error) {
    throw error;
  }
}

export default {
  create,
};
