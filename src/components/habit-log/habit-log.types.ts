import { Types } from 'mongoose';

export interface IHabitLog {
  habitInstanceId: Types.ObjectId;
  count: number;
  date: Date;
}

export interface ICreateHabitLogInput {
  userId: string;
  habitInstanceId: string;
  count: number;
  date: Date;
}
