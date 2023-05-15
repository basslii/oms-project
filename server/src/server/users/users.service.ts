import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, UpdatePasswordDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, User } from './entities/user.entity';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly prismaClient: PrismaClient<User>
  ) { }
  protected resourceUrl = this.applicationConfigService.getEndpointFor('/api/users')

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = await this.prismaClient.user.create({
      data: {
        email: createUserDto.email,
        username: createUserDto.username,
        password: hashedPassword,
      }
    })

    return newUser
  }

  async findAll(): Promise<User[]> {
    return await this.prismaClient.user.findMany({
      include: {
        employee: true,
        auth: true,
      }
    });
  }

  async findOne(id: number): Promise<User> {
    return await this.prismaClient.user.findUnique(
      {
        where: {
          id
        },
        include: {
          employee: true,
          auth: true,
        }
      }
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.prismaClient.user.update({
      where: {
        id
      },
      data: {
        email: updateUserDto.email,
        username: updateUserDto.username,
        password: await bcrypt.hash(updateUserDto.password, 10),
        // createdAt: updateUserDto.createdAt,
        // isLoading: updateUserDto.isLoading,
      },
      include: {
        employee: true,
        auth: true,
      }
    });
  }

  async remove(id: number): Promise<IUser> {
    return await this.prismaClient.user.delete({ where: { id } });
  }

  async findUserByUserName(username: string): Promise<IUser> {
    // const users: IUser[] = await this.findAll()
    // return users.find((user: IUser) => user.username === username)
    const user: User = await this.prismaClient.user.findFirst({
      where: { username },
      include: {
        employee: true,
        auth: true,
      }
    })

    return user;
  }

  async findUserByEmail(email: string, condition?: any): Promise<IUser> {
    const user: User = await this.prismaClient.user.findFirstOrThrow({
      where: { email },
      include: {
        employee: true,
        auth: true,
      }
    });

    return user;
  }


  // Where cant have two arguments
  async findByPayload(email: string, password: string): Promise<IUser> {
    const user: User = await this.prismaClient.user.findFirstOrThrow({
      where: { email: email, password: password },
      include: {
        employee: true,
        auth: true,
      }
    });
    return user;
  }

  async updateUserPassword(updatePasswordDto: UpdatePasswordDto, id: number): Promise<IUser> {
    const user: IUser = await this.prismaClient.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    const isSame = await bcrypt.compare(updatePasswordDto.old_password, user.password);

    if (!isSame) {
      throw new HttpException("Invalid credentials", HttpStatus.UNAUTHORIZED);
    }

    return await this.prismaClient.user.update({
      where: { id },
      data: { password: await bcrypt.hash(updatePasswordDto.new_password, 10) }
    })
  }
}