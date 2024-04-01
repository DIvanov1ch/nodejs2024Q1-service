import { LogLevel } from '@nestjs/common';

export const DEFAULT_PORT = 4000;

export const YAML_SWAGGER_FILENAME = 'api.yaml';

export const PATH_TO_YAML_FOLDER = './doc';

export const FAVORITES_ID = 'onetomany';

export const REFRESH_ROUTE = '/auth/refresh';

export enum Messages {
  OLD_PASSWORD_WRONG = 'Old password is wrong',
  ARTIST_OR_ALBUM_DOES_NOT_EXIST = 'Artist and/or album with provided id does not exist',
  ARTIST_DOES_NOT_EXIST = 'Artist with provided id does not exist',
  ALBUM_DOES_NOT_EXIST = 'Album with provided id does not exist',
  TRACK_DOES_NOT_EXIST = 'Track with provided id does not exist',
  USER_DOES_NOT_EXIST = 'User with provided id does not exist',
  INCORRECT_LOGIN = 'Incorrect login',
  INCORRECT_PASSWORD = 'Incorrect password',
  INVALID_REFRESH_TOKEN = 'Refresh token is invalid or expired',
}

export const DEFAULT_LOG_LEVEL: LogLevel = 'verbose';
