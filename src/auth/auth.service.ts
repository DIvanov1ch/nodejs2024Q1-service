import { Body, Injectable, ForbiddenException } from '@nestjs/common';
import { Messages } from 'src/constants/constants';
import { UserService } from 'src/core/user/user.service';
import { LogInDto } from './dto/log-in.dto';
import { RefreshDto } from './dto/refresh.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import { isEqualPassword } from 'src/utils/hash-password.utils';
import { Payload, Tokens } from './types/auth.types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(@Body() signUpDto: SignUpDto): Promise<any> {
    return await this.usersService.create(signUpDto);
  }

  async logIn(@Body() logInDto: LogInDto): Promise<Tokens> {
    const { login, password } = logInDto;
    const user = await this.usersService.findFirst(login);

    const isEqual = await isEqualPassword(password, user.password);
    if (!isEqual) {
      throw new ForbiddenException(Messages.INCORRECT_PASSWORD);
    }

    return await this.getTokens({ userId: user.id, login: user.login });
  }

  async refresh(@Body() refreshDto: RefreshDto): Promise<Tokens> {
    try {
      const { userId, login } = (await this.jwtService.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      )) as Payload;
      return await this.getTokens({ userId, login });
    } catch (error) {
      throw new ForbiddenException(Messages.INVALID_REFRESH_TOKEN);
    }
  }

  async getTokens(payload: Payload): Promise<Tokens> {
    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      }),
    };
  }
}
