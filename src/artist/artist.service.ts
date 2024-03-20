import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { Artist } from './entities/artist.entity';
import { getNotFoundMessage } from 'src/utils';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = new Artist(createArtistDto);
    await this.databaseService.add('artist', artist);
    return artist;
  }

  async findAll() {
    return await this.databaseService.getAll('artist');
  }

  async findOne(id: string) {
    const artist = await this.databaseService.getOne('artist', id);
    if (!artist) {
      throw new NotFoundException(getNotFoundMessage('artist', id));
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = (await this.findOne(id)) as Artist;
    artist.update(updateArtistDto);
    return artist;
  }

  async remove(id: string) {
    return await this.databaseService.removeOne('artist', id);
  }
}
