import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('App')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  startApp() {
    return this.appService.startApp();
  }
}
