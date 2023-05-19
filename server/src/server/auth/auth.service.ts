import { HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { IUser } from '../users/entities/user.entity';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaClient } from '@prisma/client';
import { Auth, IAuth } from './entities/auth.entity';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';

export interface RegistrationStatus {
  success: boolean;
  message: string;
  data?: IUser;
}
export interface RegistrationSeederStatus {
  success: boolean;
  message: string;
  data?: IUser[];
}
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly prismaClient: PrismaClient<Auth>,
    private readonly configService: ConfigService,
  ) { }


  options: JwtModuleOptions = {
    secretOrPrivateKey: this.configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: this.configService.get<string>('EXPIRES_IN') }
  }

  async register(createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    let status: RegistrationStatus = {
      success: true,
      message: "ACCOUNT_CREATE_SUCCESS"
    };

    try {
      status.data = await this.usersService.create(createUserDto);
    } catch (err) {
      status = {
        success: false,
        message: err,
      };
    }

    return status;
  }

  async login(email?: string, password?: string): Promise<IAuth> {
    const user = await this.validateUser(email, password);

    if (!user) throw new HttpException('user does not exist', HttpStatus.BAD_REQUEST);

    const token = await this.generateToken(user);

    if (!token) throw new HttpException('token cannot be created', HttpStatus.BAD_REQUEST);

    const sentData: IAuth = {
      user: user,
      token: token,
    }
    return { token };
  }

  async validateUser(email?: string, password?: string): Promise<IUser> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new HttpException('email or password does not exist', HttpStatus.BAD_REQUEST);
    }

    const validateUser = await bcrypt.compare(password, user.password)

    if (!validateUser) {
      throw new HttpException('email or password does not exist', HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  async generateToken(user: IUser): Promise<string> {
    const payload = { sub: user };
    return await this.jwtService.signAsync(payload, {
      privateKey: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('EXPIRES_IN')
    });
  }

  verifyAccessToken(token: string): string | null {
    try {
      const payload = this.jwtService.verify(token);
      return payload.sub;
    } catch (error) {
      return null;
    }
  }
}
