import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { DatabaseService } from 'src/database/database.service';
import { getNotFoundMessage } from 'src/utils';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Messages } from 'src/constants';
import { albumFields } from './entities/album.select';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    try {
      return await this.databaseService.album.create({
        data: createAlbumDto,
        select: albumFields,
      });
    } catch (error) {
      throw new BadRequestException(Messages.ARTIST_DOES_NOT_EXIST);
    }
  }

  async findAll() {
    return await this.databaseService.album.findMany({ select: albumFields });
  }

  async findOne(id: string) {
    const album = await this.databaseService.album.findUnique({
      where: { id },
      select: albumFields,
    });
    if (!album) {
      throw new NotFoundException(getNotFoundMessage('album', id));
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    await this.findOne(id);
    try {
      return await this.databaseService.album.update({
        where: { id },
        data: updateAlbumDto,
        select: albumFields,
      });
    } catch (error) {
      throw new BadRequestException(Messages.ARTIST_DOES_NOT_EXIST);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.databaseService.album.delete({ where: { id } });
  }
}
