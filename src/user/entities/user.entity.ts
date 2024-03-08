import { Exclude } from 'class-transformer';
import { IUser } from 'src/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { ForbiddenException } from '@nestjs/common';
import { Messages } from 'src/constants';

export class User implements IUser {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(dto: CreateUserDto) {
    const { login, password } = dto;
    const date = User.getDate();

    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = date;
    this.updatedAt = date;
  }

  static getDate() {
    return Date.now();
  }

  updatePassword(dto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = dto;

    if (this.password !== oldPassword) {
      throw new ForbiddenException(Messages.OLD_PASSWORD_WRONG);
    }

    this.password = newPassword;
    this.updatedAt = User.getDate();
    this.version += 1;
  }
}
