import {
  Body,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { DatabaseService } from 'src/database/database.service';
import { Messages } from 'src/constants/constants';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async create(@Body() createUserDto: CreateUserDto) {
    return await this.databaseService.user.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.databaseService.user.findMany();
  }

  async findOne(id: string) {
    const user = await this.databaseService.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(Messages.USER_DOES_NOT_EXIST);
    }
    return user;
  }

  async update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.findOne(id);
    const { oldPassword, newPassword } = updatePasswordDto;

    if (user.password !== oldPassword) {
      throw new ForbiddenException(Messages.OLD_PASSWORD_WRONG);
    }

    return await this.databaseService.user.update({
      where: { id },
      data: { password: newPassword, version: user.version + 1 },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.databaseService.user.delete({ where: { id } });
  }
}
