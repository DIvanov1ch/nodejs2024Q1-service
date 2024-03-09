import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { IFavoritesResponse } from 'src/interfaces';
import { Track } from 'src/track/entities/track.entity';

export class FavoritesResponse implements IFavoritesResponse {
  albums: Album[];
  artists: Artist[];
  tracks: Track[];
}
