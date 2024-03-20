import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { User } from 'src/user/entities/user.entity';

export type Entity = User | Artist | Track | Album;

export type EntityType = 'user' | 'artist' | 'track' | 'album' | 'favorites';
