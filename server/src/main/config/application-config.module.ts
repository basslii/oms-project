import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { ApplicationConfigService } from './application-config.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ApplicationConfigService],
})
export class ApplicationConfigModule {}