import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { IEmployee } from 'src/server/employees/entities/employee.entity';


export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    id: number

    @IsNotEmpty()
    @ApiProperty()
    @MinLength(3)
    username: string

    @IsNotEmpty()
    @ApiProperty()
    @IsStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @ApiProperty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    // @ApiProperty()
    createdAt: Date

    @IsNotEmpty()
    @ApiProperty()
    employee: IEmployee

    @IsNotEmpty()
    @ApiProperty()
    isLoading: boolean
}
