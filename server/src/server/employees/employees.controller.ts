import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiCreatedResponse, ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags, ApiUnprocessableEntityResponse } from '@nestjs/swagger';

@Controller('api/employees')
@ApiTags('Employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) { }

  @Post()
  @ApiCreatedResponse({ description: 'Created Successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeesService.create(createEmployeeDto);
  }

  @Get()
  @ApiOkResponse({ description: 'The resources were returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'The resource was returned successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource Not found' })
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'The resource was updated successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource Not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'The resource was deleted successfully' })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @ApiNotFoundResponse({ description: 'Resource Not found' })
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
