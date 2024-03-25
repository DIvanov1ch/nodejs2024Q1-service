import { Prisma } from '@prisma/client';

export const albumFields: Prisma.AlbumSelect = {
  id: true,
  name: true,
  year: true,
  artistId: true,
};
