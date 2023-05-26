import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { OrganizationsService } from './organizations.service';
import { CreateOrganizationDto } from './dto/create-organization.dto';

@Controller('api/organizations')
@ApiTags('Organizations')
export class OrganizationsController {
    constructor(private readonly organizationsService: OrganizationsService) { }

    @Post()
    @ApiCreatedResponse({ description: 'Created Successfully' })
    @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    async create(@Body() createOrganizationDto: CreateOrganizationDto) {
        // console.log(createOrganizationDto.id)
        console.log(createOrganizationDto.name)
        console.log(createOrganizationDto.cost_center)
        console.log(createOrganizationDto.organization_leader)
        console.log(createOrganizationDto.assistant)
        console.log(createOrganizationDto.sub_assistant)
        return this.organizationsService.create(createOrganizationDto);
    }

    @Get()
    @ApiOkResponse({ description: 'The resources were returned successfully' })
    @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    findAll() {
        return this.organizationsService.findAll();
    }
}
