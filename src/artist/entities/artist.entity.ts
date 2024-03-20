import { IArtist } from 'src/interfaces';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateArtistDto } from '../dto/update-artist.dto';

export class Artist implements IArtist {
  id: string;
  grammy: boolean;
  name: string;

  constructor(dto: CreateArtistDto) {
    const { grammy, name } = dto;

    this.id = uuidv4();
    this.name = name;
    this.grammy = grammy;
  }

  update(dto: UpdateArtistDto) {
    const { grammy, name } = dto;
    this.grammy = grammy;
    this.name = name;
  }
}
