import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { DatabaseService } from 'src/database/database.service';
import { getNotFoundMessage } from 'src/constants';

@Injectable()
export class AlbumService {
  constructor(private databaseService: DatabaseService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const album = new Album(createAlbumDto);
    await this.databaseService.add('album', album);
    return album;
  }

  async findAll() {
    return await this.databaseService.getAll('album');
  }

  async findOne(id: string) {
    const album = await this.databaseService.getOne('album', id);
    if (!album) {
      throw new NotFoundException(getNotFoundMessage('album', id));
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = (await this.findOne(id)) as Album;
    album.update(updateAlbumDto);
    return album;
  }

  async remove(id: string) {
    return await this.databaseService.removeOne('album', id);
  }
}
