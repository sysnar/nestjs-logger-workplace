import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private logger: Logger) {}

  getHello(): string {
    this.logger.error('getHello is triggered!', 2);
    this.logger.log('getHello is triggered!');
    return 'Hello World!';
  }
}
