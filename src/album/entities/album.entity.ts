import { IAlbum } from 'src/interfaces';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateAlbumDto } from '../dto/update-album.dto';

export class Album implements IAlbum {
  id: string;
  artistId: string | null;
  name: string;
  year: number;

  constructor(dto: CreateAlbumDto) {
    const { name, year, artistId } = dto;

    this.id = uuidv4();
    this.name = name;
    this.year = year;
    this.artistId = artistId || null;
  }

  update(dto: UpdateAlbumDto) {
    const { name, year, artistId } = dto;

    this.name = name;
    this.year = year;
    if (artistId) {
      this.artistId = artistId;
    }
  }
}
