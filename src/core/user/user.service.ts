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
import { hashPassword, isEqualPassword } from 'src/utils/hash-password.utils';

@Injectable()
export class UserService {
  constructor(private databaseService: DatabaseService) {}

  async create(@Body() createUserDto: CreateUserDto) {
    const hash = await hashPassword(createUserDto.password);
    const data: CreateUserDto = { ...createUserDto, password: hash };
    return await this.databaseService.user.create({ data });
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

    const isEqual = await isEqualPassword(oldPassword, user.password);
    if (!isEqual) {
      throw new ForbiddenException(Messages.OLD_PASSWORD_WRONG);
    }

    const hash = await hashPassword(newPassword);

    return await this.databaseService.user.update({
      where: { id },
      data: { password: hash, version: user.version + 1 },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.databaseService.user.delete({ where: { id } });
  }

  async findFirst(login: string) {
    const user = await this.databaseService.user.findFirst({
      where: { login },
    });
    if (!user) {
      throw new ForbiddenException(Messages.INCORRECT_LOGIN);
    }
    return user;
  }
}
