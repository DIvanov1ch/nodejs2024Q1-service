import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { IFavoritesResponse } from './favorites.model';
import { Track } from 'src/track/entities/track.entity';

export class FavoritesResponse implements IFavoritesResponse {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
