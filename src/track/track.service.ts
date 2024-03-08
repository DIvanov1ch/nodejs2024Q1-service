import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { DatabaseService } from 'src/database/database.service';
import { getNotFoundMessage } from 'src/constants';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = new Track(createTrackDto);
    await this.databaseService.add('track', track);
    return track;
  }

  async findAll() {
    return await this.databaseService.getAll('track');
  }

  async findOne(id: string) {
    const track = await this.databaseService.getOne('track', id);
    if (!track) {
      throw new NotFoundException(getNotFoundMessage('track', id));
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = (await this.findOne(id)) as Track;
    track.update(updateTrackDto);
    return track;
  }

  async remove(id: string) {
    return await this.databaseService.removeOne('track', id);
  }
}
