import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApplicationConfigService } from './src/main/config/application-config.service';

export interface App {
  app_name: string,
  app_name_shorthand: string,
}

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name)

  constructor(
    private readonly configService: ConfigService,
  ) { }

  async startApp(): Promise<App> {
    this.logger.log(this.configService.get('APP_NAME'));
    return {
      app_name: await this.configService.get('APP_NAME'),
      app_name_shorthand: await this.configService.get('APP_NAME_SHORTHAND'),
    }
  }
}
