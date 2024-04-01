import { Album } from 'src/core/album/entities/album.entity';
import { Artist } from 'src/core/artist/entities/artist.entity';
import { Track } from 'src/core/track/entities/track.entity';

export interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface IFavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
