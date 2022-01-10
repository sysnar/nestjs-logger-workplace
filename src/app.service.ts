import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private logger: Logger) {}

  getHello(): string {
    this.logger.warn('getHello is triggered!');
    return 'Hello World!';
  }
}
