import { Types } from 'mongoose';

export interface IHabitInstance {
  habitDefinitionId: Types.ObjectId;
  goal: Goal;
  createdAt: Date;
  updatedAt: Date;
}

export interface Repeat {
  on?: RepeatOn[];
  every: number;
  interval: RepeatInterval;
}

export interface Goal {
  count: number;
  repeat: Repeat;
  reminder?: string;
}

export enum RepeatOn {
  SATURDAY = 'Sat',
  SUNDAY = 'Sun',
  MONDAY = 'Mon',
  TUESDAY = 'Tue',
  WEDNESDAY = 'Wed',
  THURSDAY = 'Thu',
  FRIDAY = 'Fri',
}

export enum RepeatInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export interface ICreateHabitInstanceInput  {
  goal: Goal;
  habitDefinitionId: string;
  userId: string;
};
