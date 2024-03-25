import { Prisma } from '@prisma/client';

export const artistFields: Prisma.ArtistSelect = {
  id: true,
  name: true,
  grammy: true,
};
