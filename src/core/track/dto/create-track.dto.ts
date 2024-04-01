import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  albumId: string;

  @IsNotEmpty()
  @IsInt()
  duration: number;
}
