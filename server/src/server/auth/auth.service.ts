import { BadRequestException, HttpException, HttpStatus, Injectable, NotAcceptableException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { IUser, User } from '../users/entities/user.entity';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaClient } from '@prisma/client';
import { Auth, IAuth } from './entities/auth.entity';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { Request, Response, response } from "express"

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

    const checkUser = await this.usersService.findUserByEmail(createUserDto.email);
    if (checkUser) throw new BadRequestException('User already exists');

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

  async login(user: IUser, req: Request, res: Response) {
    const validatedUser = await this.validateUser(user.email, user.password);

    if (!validatedUser) throw new BadRequestException('wrong credentials');

    const { password, ...results } = validatedUser
    const token = await this.generateToken({ id: validatedUser.id, email: validatedUser.email });

    if (!token) throw new BadRequestException('token cannot be created');
    res.cookie('token', token)

    return res.send({ message: 'logged in successfully' })
  }

  async validateUser(email?: string, password?: string): Promise<IUser> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('email or password is incorrect');
    }

    const validateUser = await bcrypt.compare(password, user.password)

    if (!validateUser) {
      throw new BadRequestException('email or password is incorrect');
    }

    return user;
  }

  async generateToken(args: { id: number, email: string }): Promise<string> {
    const payload = args;
    return await this.jwtService.signAsync(payload, {
      privateKey: this.configService.get<string>('JWT_SECRET'),
      expiresIn: this.configService.get<string>('EXPIRES_IN')
    });
  }

  async verifyAccessToken(bearerToken: string): Promise<boolean | null> {
    const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
    let isValid: boolean = false;
    try {
      const payload = await this.jwtService.verifyAsync(bearerToken, verifyOptions);
      console.log("payload", payload)
      const { sub, typeid, iat, exp } = payload;

      const filterDto: IUser = { email: sub.email }
      const user = await this.usersService.findUserByEmail(filterDto.email);
      console.log("verifyAccessToken user: ", user)
      if (!user) throw new HttpException('user is not found', HttpStatus.UNAUTHORIZED);
      isValid = true;
    }
    catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }

  async logout(req: Request, res: Response) {
    req.session.destroy(() => {
      // res.cookie(this.configService.get<string>('SESSION_NAME'), "", {
      //   path: "/",
      //   httpOnly: true,
      //   maxAge: 0,
      //   expires: new Date(0)
      // })
      res.end();
    })
    res.clearCookie('token');
    return res.send({ message: "user logged out successfully" })
  }
}
