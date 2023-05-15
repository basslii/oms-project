import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@ApiTags('OMS')
@Controller('OMS')
export class ApiConfigController {
    // @Post()
    //     @ApiCreatedResponse({ description: 'Created Successfully' })
    //     @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    //     @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    //     create(@Body() createOMSDto: CreateOMSDto) {
    //         return this.apiConfigService.create(createOMSDto)
    //     }

    // @Get()
    //     @ApiOkResponse({ description: 'The reosurces were returned successfully' }) 
    //     @ApiForbiddenResponse({ description: 'Unauthorized Request' })
    //     findAll() {
    //         return this.apiConfigService.findAll
    //     }
}