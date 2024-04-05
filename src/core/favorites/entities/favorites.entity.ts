import { IFavorites } from './favorites.model';

export class Favorites implements IFavorites {
  albums: string[];
  artists: string[];
  tracks: string[];
}
