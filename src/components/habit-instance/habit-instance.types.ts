import { Types } from 'mongoose';

export interface IHabitInstance {
  habitDefinitionId: Types.ObjectId;
  goal: Goal;
  createdAt: Date;
  updatedAt: Date;
}

export interface Repeat {
  every: number;
  interval: RepeatInterval;
  on?: RepeatOn[];
  at?: string;
}

export interface Goal {
  count: number;
  repeat: Repeat;
}

export enum WeekRepeatOn {
  SAT = 'Sat',
  SUN = 'Sun',
  MON = 'Mon',
  TUE = 'Tue',
  WED = 'Wed',
  THU = 'Thu',
  FRI = 'Fri',
}

export enum MonthRepeatOn {
  DAY_1 = 'Day_1',
  DAY_2 = 'Day_2',
  DAY_3 = 'Day_3',
  DAY_4 = 'Day_4',
  DAY_5 = 'Day_5',
  DAY_6 = 'Day_6',
  DAY_7 = 'Day_7',
  DAY_8 = 'Day_8',
  DAY_9 = 'Day_9',
  DAY_10 = 'Day_10',
  DAY_11 = 'Day_11',
  DAY_12 = 'Day_12',
  DAY_13 = 'Day_13',
  DAY_14 = 'Day_14',
  DAY_15 = 'Day_15',
  DAY_16 = 'Day_16',
  DAY_17 = 'Day_17',
  DAY_18 = 'Day_18',
  DAY_19 = 'Day_19',
  DAY_20 = 'Day_20',
  DAY_21 = 'Day_21',
  DAY_22 = 'Day_22',
  DAY_23 = 'Day_23',
  DAY_24 = 'Day_24',
  DAY_25 = 'Day_25',
  DAY_26 = 'Day_26',
  DAY_27 = 'Day_27',
  DAY_28 = 'Day_28',
  DAY_29 = 'Day_29',
  DAY_30 = 'Day_30',
  DAY_31 = 'Day_31',
  LAST_DAY = 'Last_Day',
  FIRST_SAT = 'First_Sat',
  FIRST_SUN = 'First_Sun',
  FIRST_MON = 'First_Mon',
  FIRST_TUE = 'First_Tue',
  FIRST_WED = 'First_Wed',
  FIRST_THU = 'First_Thu',
  FIRST_FRI = 'First_Fri',
  SECOND_SAT = 'Second_Sat',
  SECOND_SUN = 'Second_Sun',
  SECOND_MON = 'Second_Mon',
  SECOND_TUE = 'Second_Tue',
  SECOND_WED = 'Second_Wed',
  SECOND_THU = 'Second_Thu',
  SECOND_FRI = 'Second_Fri',
  THIRD_SAT = 'Third_Sat',
  THIRD_SUN = 'Third_Sun',
  THIRD_MON = 'Third_Mon',
  THIRD_TUE = 'Third_Tue',
  THIRD_WED = 'Third_Wed',
  THIRD_THU = 'Third_Thu',
  THIRD_FRI = 'Third_Fri',
  FOURTH_SAT = 'Fourth_Sat',
  FOURTH_SUN = 'Fourth_Sun',
  FOURTH_MON = 'Fourth_Mon',
  FOURTH_TUE = 'Fourth_Tue',
  FOURTH_WED = 'Fourth_Wed',
  FOURTH_THU = 'Fourth_Thu',
  FOURTH_FRI = 'Fourth_Fri',
  LAST_SAT = 'Last_Sat',
  LAST_SUN = 'Last_Sun',
  LAST_MON = 'Last_Mon',
  LAST_TUE = 'Last_Tue',
  LAST_WED = 'Last_Wed',
  LAST_THU = 'Last_Thu',
  LAST_FRI = 'Last_Fri',
}

export type RepeatOn = WeekRepeatOn | MonthRepeatOn;

export enum RepeatInterval {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
}

export interface ICreateHabitInstanceInput {
  goal: Goal;
  habitDefinitionId: string;
  userId: string;
}

export interface IFindAllOptions {
  userId: string;
}
