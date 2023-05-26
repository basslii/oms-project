import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IOrganization, Organization } from './entities/organization.entity';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Injectable()
export class OrganizationsService {
    constructor(private readonly prismaClient: PrismaClient<Organization>) { }

    async create(createOrganizationDto: CreateOrganizationDto): Promise<IOrganization> {
        const newOrg = await this.prismaClient.organization.create({
            data: {
                name: createOrganizationDto.name,
                cost_center: createOrganizationDto.cost_center,
                organizationLeaderId: createOrganizationDto.organization_leader.id,
                assistantId: createOrganizationDto.assistant.id,
                subAssistantId: createOrganizationDto.sub_assistant.id,
            }
        })

        return newOrg;
    }

    async findAll(): Promise<IOrganization[]> {
        return await this.prismaClient.organization.findMany();
    }
}
