import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { ApplicationConfigModule } from 'src/main/config/application-config.module';
import { ApplicationConfigService } from 'src/main/config/application-config.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [ApplicationConfigModule],
  controllers: [EmployeesController],
  providers: [EmployeesService, ApplicationConfigService, PrismaClient]
})
export class EmployeesModule {}
