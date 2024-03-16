import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { DatabaseService } from 'src/database/database.service';
import { getNotFoundMessage } from 'src/utils';
import { artistFields } from './entities/artist.select';

@Injectable()
export class ArtistService {
  constructor(private databaseService: DatabaseService) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = await this.databaseService.artist.create({
      data: createArtistDto,
      select: artistFields,
    });
    return artist;
  }

  async findAll() {
    return await this.databaseService.artist.findMany({ select: artistFields });
  }

  async findOne(id: string) {
    const artist = await this.databaseService.artist.findUnique({
      where: { id },
      select: artistFields,
    });
    if (!artist) {
      throw new NotFoundException(getNotFoundMessage('artist', id));
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    await this.findOne(id);
    return await this.databaseService.artist.update({
      where: { id },
      data: updateArtistDto,
      select: artistFields,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.databaseService.artist.delete({ where: { id } });
  }
}
