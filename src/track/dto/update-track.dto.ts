import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class UpdateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsString()
  @IsUUID()
  albumId: string | null;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
