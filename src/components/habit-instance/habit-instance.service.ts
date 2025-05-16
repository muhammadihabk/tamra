import HabitInstanceRepository from './habit-instance.repository';
import { ICreateHabitInstanceInput } from './habit-instance.types';

async function create(data: ICreateHabitInstanceInput) {
  try {
    await HabitInstanceRepository.create(data);
  } catch (error) {
    throw error;
  }
}

async function habitsByUserId(id: string) {
  try {
    return await HabitInstanceRepository.findAll({ userId: id });
  } catch (error) {
    throw error;
  }
}

export default {
  create,
  habitsByUserId,
};
