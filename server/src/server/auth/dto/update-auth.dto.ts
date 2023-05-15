import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';
import { IsNotEmpty } from 'class-validator';
import { IUser } from 'src/server/users/entities/user.entity';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {
    @IsNotEmpty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    token: string

    @IsNotEmpty()
    user: IUser

    @IsNotEmpty()
    @ApiProperty()
    userId: number
}
