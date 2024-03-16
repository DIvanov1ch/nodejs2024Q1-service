import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { DatabaseService } from 'src/database/database.service';
import { getNotFoundMessage } from 'src/utils';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Messages } from 'src/constants';
import { trackFields } from './entities/track.select';

@Injectable()
export class TrackService {
  constructor(private databaseService: DatabaseService) {}

  async create(createTrackDto: CreateTrackDto) {
    try {
      return await this.databaseService.track.create({
        data: createTrackDto,
        select: trackFields,
      });
    } catch (error) {
      throw new BadRequestException(Messages.ARTIST_OR_ALBUM_DOES_NOT_EXIST);
    }
  }

  async findAll() {
    return await this.databaseService.track.findMany({ select: trackFields });
  }

  async findOne(id: string) {
    const track = await this.databaseService.track.findUnique({
      where: { id },
      select: trackFields,
    });
    if (!track) {
      throw new NotFoundException(getNotFoundMessage('track', id));
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);
    try {
      return await this.databaseService.track.update({
        where: { id },
        data: updateTrackDto,
        select: trackFields,
      });
    } catch (error) {
      throw new BadRequestException(Messages.ARTIST_OR_ALBUM_DOES_NOT_EXIST);
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    return await this.databaseService.track.delete({ where: { id } });
  }
}
