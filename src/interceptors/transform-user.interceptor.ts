import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { User as PrismaUser } from '@prisma/client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TransformUserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Record<string, any>> {
    return next.handle().pipe(
      map((data: PrismaUser | PrismaUser[]) => {
        if (Array.isArray(data)) {
          return data.map((prismaUser: PrismaUser) => new User(prismaUser));
        }
        return new User(data);
      }),
      map((user: User | User[]) => instanceToPlain(user)),
    );
  }
}
