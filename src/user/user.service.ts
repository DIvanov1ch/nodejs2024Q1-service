import { Body, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from 'src/database/database.service';
import { User } from './entities/user.entity';
import { getNotFoundMessage } from 'src/constants';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User(createUserDto);
    await this.databaseService.add('user', user);
    return user;
  }

  async findAll() {
    return await this.databaseService.getAll('user');
  }

  async findOne(id: string) {
    const user = await this.databaseService.getOne('user', id);
    if (!user) {
      throw new NotFoundException(getNotFoundMessage('user', id));
    }
    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = (await this.findOne(id)) as User;
    user.updatePassword(updatePasswordDto);
    return user;
  }

  async remove(id: string) {
    return await this.databaseService.removeOne('user', id);
  }
}
