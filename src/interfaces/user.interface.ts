import { Types } from 'mongoose'

export interface IUser {
    _id?: Types.ObjectId;
    name: string;
    email: string;
    password: string;
    tokens: {
        token: string;
      }[],
    avatar: String;
    generateAuthToken(): Promise<string>,
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
  avatar?: String;
}

export interface IUpdateUser extends Partial<ICreateUser> {
  age: number;
}