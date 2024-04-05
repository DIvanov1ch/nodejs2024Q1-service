import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  ParseUUIDPipe,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  @Post('track/:id')
  addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.add('track', id);
  }

  @Post('artist/:id')
  addArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.add('artist', id);
  }

  @Post('album/:id')
  addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.add('album', id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.remove('track', id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.remove('artist', id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.remove('album', id);
  }
}
