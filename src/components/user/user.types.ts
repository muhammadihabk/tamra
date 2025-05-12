import { IHabitInstance } from "../habit-instance/habit-instance.types";

export interface IDBUser {
  _id: string;
  name: string;
  email: string;
  salt: string;
  hash: string;
  picture?: string;
  habits: IHabitInstance[]
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateUser extends Omit<IDBUser, 'salt' | 'hash'> {
  password: string;
}

export interface IFindUserFilter {
  id?: string;
  email?: string;
}

export interface ILoginResponse {
  token: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}
