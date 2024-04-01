import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './public/public.decorator';

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Public()
  @Get()
  getInfo(): string {
    return this.appService.getInfo();
  }
}
