import { IUser } from "src/server/users/entities/user.entity"
import { IsNotEmpty } from "class-validator"
import { ApiProperty } from "@nestjs/swagger"


export class CreateAuthDto {
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
