import HabitLogRepository from "./habit-log.repository";
import { ICreateHabitLogInput } from "./habit-log.types";

async function create(data: ICreateHabitLogInput) {
  try {
    await HabitLogRepository.create(data);
  } catch (error) {
    throw error;
  }
}

export default {
  create,
};
