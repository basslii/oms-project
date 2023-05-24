import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards, Session, Req, Res } from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { IUser } from '../users/entities/user.entity';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthenticatedGuard, LocalAuthGuard } from './local/local-auth.guard';
import { session } from 'passport';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) { }

  @Post('register')
  public async register(@Body() createUserDto: CreateUserDto): Promise<RegistrationStatus> {
    const result: RegistrationStatus = await this.authService.register(createUserDto);

    if (!result.success) {
      throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
    }
    return result;
  }

  @Post('signin')
  async login(@Body() loginUserDto: LoginUserDto, @Req() req, @Res() res): Promise<any> {
    const { email, password } = loginUserDto
    return this.authService.login(loginUserDto, req, res)
  }

  @Post('validate')
  public async validate(@Body() loginUserDto: LoginUserDto): Promise<IUser> {
    return this.authService.validateUser(loginUserDto.email, loginUserDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('session')
  public async getSession(@Session() session) {
    // const jwtToken = req.cookies.token;
    // return res.send({ token });
    // const { token, ...others } = req.cookies;
    return session;
  }

  @Get('logout')
  async logout(@Req() req, @Res() res) {
    return await this.authService.logout(req, res)
  }
}