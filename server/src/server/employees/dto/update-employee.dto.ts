import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from './create-employee.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IUser, User } from 'src/server/users/entities/user.entity';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) {
    @IsNotEmpty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    firstname: string

    @ApiProperty()
    @IsNotEmpty()
    lastname: string

    @ApiProperty()
    @IsNotEmpty()
    phone_number: string

    @ApiProperty()
    @ApiPropertyOptional()
    image_url: Uint8Array

    @ApiProperty()
    @ApiPropertyOptional()
    image_type: string

    @IsNotEmpty()
    user: IUser

    @IsNotEmpty()
    @ApiProperty()
    userId: number
}
