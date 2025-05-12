export interface IDBUser {
  _id: string;
  name: string;
  email: string;
  salt: string;
  hash: string;
  picture?: string;
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
