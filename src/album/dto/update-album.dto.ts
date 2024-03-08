import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  IsUUID,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string | null;
}
