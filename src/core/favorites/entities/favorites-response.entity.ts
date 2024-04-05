import { Album } from 'src/core/album/entities/album.entity';
import { Artist } from 'src/core/artist/entities/artist.entity';
import { IFavoritesResponse } from './favorites.model';
import { Track } from 'src/core/track/entities/track.entity';

export class FavoritesResponse implements IFavoritesResponse {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
