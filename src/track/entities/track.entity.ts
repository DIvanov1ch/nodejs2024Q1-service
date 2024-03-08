import { ITrack } from 'src/interfaces';
import { CreateTrackDto } from '../dto/create-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';

export class Track implements ITrack {
  id: string;
  albumId: string;
  artistId: string;
  duration: number;
  name: string;

  constructor(dto: CreateTrackDto) {
    const { duration, name, albumId, artistId } = dto;

    this.id = uuidv4();
    this.duration = duration;
    this.name = name;
    this.albumId = albumId || null;
    this.artistId = artistId || null;
  }

  update(dto: UpdateTrackDto) {
    const { name, duration, albumId, artistId } = dto;

    this.name = name;
    this.duration = duration;
    this.albumId = albumId;
    this.artistId = artistId;
  }
}
