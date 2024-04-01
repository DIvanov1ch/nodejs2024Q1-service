import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { REFRESH_ROUTE } from 'src/constants/constants';
import { IS_PUBLIC_KEY } from 'src/decorators/public.decorator';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.isPublicRoute(context);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.getTokenFromRequest(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    if (request.originalUrl === REFRESH_ROUTE) {
      return true;
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isPublicRoute(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private getTokenFromRequest(request: Request) {
    const { originalUrl, body } = request;

    return originalUrl === REFRESH_ROUTE
      ? (body as RefreshDto).refreshToken
      : this.extractTokenFromHeader(request);
  }
}
