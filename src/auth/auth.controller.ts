import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  HttpCode,
} from '@nestjs/common';
import { StatusCodes } from 'http-status-codes';
import { TransformUserInterceptor } from 'src/interceptors/transform-user.interceptor';
import { Public } from 'src/public/public.decorator';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/log-in.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseInterceptors(TransformUserInterceptor)
  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @Public()
  @Post('login')
  async logIn(@Body() logInDto: LogInDto) {
    return this.authService.logIn(logInDto);
  }

  @HttpCode(StatusCodes.OK)
  @Post('refresh')
  async refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}
