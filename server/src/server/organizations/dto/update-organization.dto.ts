import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateOrganizationDto } from "./create-organization.dto"
import { IUser, User } from "../../users/entities/user.entity"

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
    id: number

    name: string

    cost_center: string

    organization_leader: IUser

    assistant: IUser

    sub_assistant: IUser

    employees: IUser[]
}
