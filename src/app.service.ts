import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo(): string {
    return `For more information, see <a href="http://localhost:${process.env.PORT}/doc/">swagger.doc</a>`;
  }
}
