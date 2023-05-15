import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersController } from "../users/users.controller";
import { PrismaClient } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { LocalAuthGuard } from './local/local-auth.guard';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          signOptions: { expiresIn: configService.get<string>('EXPIRES_IN') },
          privateKey: configService.get<string>('JWT_SECRET'),
        }
      },
      inject: [ConfigService]
    }),
  ],
  controllers: [AuthController, UsersController],
  providers: [AuthService, PrismaClient, UsersService, ApplicationConfigService, ConfigService, LocalStrategy]
})
export class AuthModule { }
