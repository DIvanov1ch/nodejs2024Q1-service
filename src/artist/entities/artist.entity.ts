import { IArtist } from './artist.model';

export class Artist implements IArtist {
  id: string;
  grammy: boolean;
  name: string;
}
