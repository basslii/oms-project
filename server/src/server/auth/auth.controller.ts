import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus, Request, UseGuards, Session } from '@nestjs/common';
import { AuthService, RegistrationStatus } from './auth.service';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { IUser } from '../users/entities/user.entity';
import { JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto, LoginUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthenticatedGuard, LocalAuthGuard } from './local/local-auth.guard';
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

  @UseGuards(LocalAuthGuard)
  @Post('signin')
  async login(@Request() req): Promise<any> {
    return await this.authService.login(req.body.email, req.body.password);
  }

  @Post('validate')
  public async validate(@Body() loginUserDto: LoginUserDto): Promise<IUser> {
    return this.authService.validateUser(loginUserDto.email, loginUserDto.password);
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('session')
  public async getAuthSession(@Request() req) {
    console.log(req)
    return req.session;
  }

  @Get('logout')
  logout(@Session() session: Record<string, any>): any {
    session.destroy()
    return { msg: "User has successfully logged out" }
  }
}