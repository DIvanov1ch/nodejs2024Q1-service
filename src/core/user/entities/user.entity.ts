import { Exclude } from 'class-transformer';
import { IUser } from './user.model';
import { User as PrismaUser } from '@prisma/client';

export class User implements IUser {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(user: PrismaUser) {
    const { id, login, password, version, createdAt, updatedAt } = user;
    this.id = id;
    this.login = login;
    this.password = password;
    this.version = version;
    this.createdAt = User.convertDateToTimestamp(createdAt);
    this.updatedAt = User.convertDateToTimestamp(updatedAt);
  }

  static convertDateToTimestamp(date: Date) {
    return new Date(date).getTime();
  }
}
