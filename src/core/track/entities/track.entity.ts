import { ITrack } from './track.model';

export class Track implements ITrack {
  id: string;
  albumId: string;
  artistId: string;
  duration: number;
  name: string;
}
