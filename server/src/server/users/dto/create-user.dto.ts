import { IsEmail, IsNotEmpty, IsStrongPassword, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { IEmployee } from "src/server/employees/entities/employee.entity";
import { IUser } from "../entities/user.entity";
import { IAuth } from "src/server/auth/entities/auth.entity";
import Role from "../../../../prisma/lib/prisma";

export class CreateUserDto implements IUser {
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
    @ApiProperty()
    createdAt: Date

    @IsNotEmpty()
    @ApiProperty()
    updatedAt: Date

    @IsNotEmpty()
    @ApiProperty()
    employee: IEmployee

    @IsNotEmpty()
    @ApiProperty()
    auth: IAuth[]

    @IsNotEmpty()
    @ApiProperty()
    role: typeof Role

    @IsNotEmpty()
    @ApiProperty()
    isLoading: boolean
}

export class UpdatePasswordDto {

    @IsNotEmpty()
    @ApiProperty() new_password: string;

    @IsNotEmpty()
    @ApiProperty() old_password: string;

}

export class LoginUserDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty() readonly email: string;

    @ApiProperty()
    @IsNotEmpty() readonly password: string;
}