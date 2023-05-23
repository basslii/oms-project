import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from "./users.controller";
import { ApplicationConfigModule } from 'src/main/config/application-config.module';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt/jwt.strategy';
@Module({
  imports: [ApplicationConfigModule, AuthModule],
  controllers: [UsersController],
  providers: [UsersService, AuthService, ApplicationConfigService, PrismaClient, JwtStrategy]
})
export class UsersModule { }