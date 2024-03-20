import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { EntityType } from 'src/types';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DatabaseService) {}

  async add(type: EntityType, id: string) {
    return await this.databaseService.addToFavorites(type, id);
  }

  async getAll() {
    return await this.databaseService.getAllFavorites();
  }

  async remove(type: EntityType, id: string) {
    return await this.databaseService.removeFromFavorites(type, id);
  }
}
