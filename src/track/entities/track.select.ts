import { Prisma } from '@prisma/client';

export const trackFields: Prisma.TrackSelect = {
  id: true,
  name: true,
  artistId: true,
  albumId: true,
  duration: true,
};
