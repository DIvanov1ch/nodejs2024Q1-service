import {
  Injectable,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { albumFields } from 'src/album/entities/album.select';
import { artistFields } from 'src/artist/entities/artist.select';
import { FAVORITES_ID, Messages } from 'src/constants/constants';
import { DatabaseService } from 'src/database/database.service';
import { trackFields } from 'src/track/entities/track.select';
import { EntityType } from 'src/types/types';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DatabaseService) {}

  async add(type: EntityType, id: string) {
    try {
      const select = this.getSelect(type);
      return await this.databaseService[type as string].update({
        where: { id },
        data: {
          Favorites: {
            connectOrCreate: {
              where: { id: FAVORITES_ID },
              create: { id: FAVORITES_ID },
            },
          },
        },
        select,
      });
    } catch (error) {
      const message = this.getErrorMessage(type);
      throw new UnprocessableEntityException(message);
    }
  }

  async getAll() {
    return (
      (await this.databaseService.favorites.findUnique({
        where: { id: FAVORITES_ID },
        select: {
          albums: { select: albumFields },
          artists: { select: artistFields },
          tracks: { select: trackFields },
        },
      })) || { artists: [], albums: [], tracks: [] }
    );
  }

  async remove(type: EntityType, id: string) {
    try {
      return await this.databaseService[type as string].update({
        where: { id },
        data: {
          Favorites: {
            disconnect: {
              id: FAVORITES_ID,
            },
          },
        },
      });
    } catch (error) {
      const message = this.getErrorMessage(type);
      throw new NotFoundException(message);
    }
  }

  getSelect(type: EntityType) {
    return type === 'artist'
      ? artistFields
      : type === 'album'
      ? albumFields
      : trackFields;
  }

  getErrorMessage(type: EntityType) {
    return type === 'artist'
      ? Messages.ARTIST_DOES_NOT_EXIST
      : type === 'album'
      ? Messages.ALBUM_DOES_NOT_EXIST
      : Messages.TRACK_DOES_NOT_EXIST;
  }
}
