import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, PrismaClient]
})
export class OrganizationsModule { }
