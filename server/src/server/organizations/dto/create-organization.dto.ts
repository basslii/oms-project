import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { IUser, User } from "src/server/users/entities/user.entity"

export class CreateOrganizationDto {
    @IsNotEmpty()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    cost_center: string

    @ApiProperty()
    organization_leader: IUser

    @ApiProperty()
    assistant: IUser

    @ApiProperty()
    sub_assistant: IUser

    @ApiProperty()
    employees: IUser[]
}
