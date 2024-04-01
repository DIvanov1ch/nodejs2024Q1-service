import { IsString, IsNotEmpty } from 'class-validator';

export class LogInDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
