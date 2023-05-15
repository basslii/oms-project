import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdatePasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiSecurity, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard"
@Controller('api/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Created Successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);

    //To include creating jwt token
    // const { newUser: CreateUserDto, token } = await this.usersService.create(createUserDto);
    // return { newUser: CreateUserDto, token };
  }

  @Get()
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource Not found' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource Not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource Not found' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiSecurity('access-key')
  // @UseInterceptors(ClassSerializerInterceptor)
  // @Get('me')
  // public async me(@Request() req) {
  //   return new RenderUser(req.user);
  // }

  @UseGuards(JwtAuthGuard)
  @ApiSecurity('access-key')
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('update/password')
  public async updatePassword(@Request() req: any, @Body() updatePasswordDto: UpdatePasswordDto) {
    await this.usersService
      .updateUserPassword(updatePasswordDto, req.user.id);
    return {
      message: "password_update_success"
    };
  };
};
