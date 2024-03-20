import { IFavorites } from 'src/interfaces';

export class Favorites implements IFavorites {
  albums: string[];
  artists: string[];
  tracks: string[];
}
