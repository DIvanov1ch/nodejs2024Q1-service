import { Exclude } from 'class-transformer';
import { IUser } from 'src/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { IsUUID } from 'class-validator';

export class User implements IUser {
  @IsUUID('4')
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(dto: CreateUserDto) {
    const { login, password } = dto;
    const date = Date.now();

    this.login = login;
    this.password = password;
    this.version = 1;
    this.id = uuidv4();
    this.createdAt = date;
    this.updatedAt = date;
  }
}
