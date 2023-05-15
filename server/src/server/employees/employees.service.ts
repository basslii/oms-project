import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaClient } from '@prisma/client';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { Employee } from './entities/employee.entity';

@Injectable()
export class EmployeesService {

  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
    private readonly prismaClient: PrismaClient<Employee>
  ) { }

  protected resourceUrl = this.applicationConfigService.getEndpointFor('/api/employees')

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const imageBuffer = Buffer.from(createEmployeeDto.image_url)
    const newEmployee = await this.prismaClient.employee.create({
      data: {
        firstname: createEmployeeDto.firstname,
        lastname: createEmployeeDto.lastname,
        phone_number: createEmployeeDto.phone_number,
        image_url: imageBuffer,
        image_type: createEmployeeDto.image_type,
        userId: createEmployeeDto.user.id
      }
    })

    return newEmployee;
  }

  async findAll(): Promise<Employee[]> {
    return await this.prismaClient.employee.findMany();
  }

  async findOne(id: number): Promise<Employee> {
    return await this.prismaClient.employee.findUnique({ where: { id } });

  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee> {
    const imageBuffer = Buffer.from(updateEmployeeDto.image_url)

    return await this.prismaClient.employee.update({
      where: { id }, data: {
        firstname: updateEmployeeDto.firstname,
        lastname: updateEmployeeDto.lastname,
        phone_number: updateEmployeeDto.phone_number,
        image_url: imageBuffer,
        image_type: updateEmployeeDto.image_type,
      }
    });
  }

  async remove(id: number): Promise<Employee> {
    return await this.prismaClient.employee.delete({ where: { id } });
  }
}
