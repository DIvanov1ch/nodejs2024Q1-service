import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';
import { getNotFoundInFavsMessage, getNotFoundMessage } from 'src/utils';
import { Favorites } from 'src/favorites/entities/favorites.entity';
import { Track } from 'src/track/entities/track.entity';
import { EntityType, Entity } from 'src/types';
import { User } from 'src/user/entities/user.entity';
import { FavoritesResponse } from 'src/favorites/entities/favorites-response.entity';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private base = new Map<EntityType, Entity[]>();

  private favorites: Favorites;

  onModuleInit() {
    this.base.set('user', <User[]>[]);
    this.base.set('artist', <Artist[]>[]);
    this.base.set('track', <Track[]>[]);
    this.base.set('album', <Album[]>[]);
    this.favorites = { albums: [], artists: [], tracks: [] };
  }

  async add(type: EntityType, entity: Entity) {
    this.base.get(type).push(entity);
  }

  async getOne(type: EntityType, id: string) {
    return this.base.get(type).find((entity) => entity.id === id);
  }

  async getAll(type: EntityType) {
    return this.base.get(type);
  }

  async removeOne(type: EntityType, id: string) {
    const entityIndex = this.base
      .get(type)
      .findIndex((entity) => entity.id === id);

    if (entityIndex === -1) {
      throw new NotFoundException(getNotFoundMessage(type, id));
    }
    this.base.get(type).splice(entityIndex, 1);

    if (type === 'artist' || type === 'album') {
      await this.removeRefs(type, id);
    }
  }

  async removeRefs(type: EntityType, id: string) {
    if (type === 'artist') {
      this.base.get('track').forEach((track: Track) => {
        if (track.artistId === id) {
          track.artistId = null;
        }
      });
      this.base.get('album').forEach((album: Album) => {
        if (album.artistId === id) {
          album.artistId = null;
        }
      });
    }

    if (type === 'album') {
      this.base.get('track').forEach((track: Track) => {
        if (track.albumId === id) {
          track.albumId = null;
        }
      });
    }
  }

  async getAllFavorites() {
    const response: FavoritesResponse = {
      albums: <Album[]>[],
      artists: <Artist[]>[],
      tracks: <Track[]>[],
    };
    this.base.get('album').forEach((album: Album) => {
      if (this.favorites.albums.includes(album.id)) {
        response.albums.push(album);
      }
    });
    this.base.get('artist').forEach((artist: Artist) => {
      if (this.favorites.artists.includes(artist.id)) {
        response.artists.push(artist);
      }
    });
    this.base.get('track').forEach((track: Track) => {
      if (this.favorites.tracks.includes(track.id)) {
        response.tracks.push(track);
      }
    });
    return response;
  }

  async addToFavorites(type: EntityType, id: string) {
    const target = this.getTarget(type);
    const isExist = this.isExist(type, id);
    if (!isExist) {
      throw new UnprocessableEntityException();
    }
    this.favorites[target].push(id);
    return { id };
  }

  async removeFromFavorites(type: EntityType, id: string) {
    const target = this.getTarget(type);
    const entityIndex = this.favorites[target].indexOf(id);
    if (entityIndex === -1) {
      throw new NotFoundException(getNotFoundInFavsMessage(type, id));
    }
    this.favorites[target].splice(entityIndex, 1);
  }

  isExist(type: EntityType, id: string) {
    return !!this.base.get(type).find((entity) => entity.id === id);
  }

  getTarget(type: EntityType) {
    return type === 'track'
      ? 'tracks'
      : type === 'artist'
      ? 'artists'
      : 'albums';
  }
}
