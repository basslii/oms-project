import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from "./users.controller";
import { ApplicationConfigModule } from 'src/main/config/application-config.module';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { PrismaClient } from '@prisma/client';
// import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    ApplicationConfigModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, ApplicationConfigService, PrismaClient]
})
export class UsersModule { }