import { IAlbum } from './album.model';

export class Album implements IAlbum {
  id: string;
  artistId: string | null;
  name: string;
  year: number;
}
