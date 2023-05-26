import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './src/server/users/users.module';
import { EmployeesModule } from './src/server/employees/employees.module';
import { ApplicationConfigModule } from './src/main/config/application-config.module';
import { ApplicationConfigService } from './src/main/config/application-config.service';
import { AuthModule } from 'src/server/auth/auth.module';
import { OrganizationsModule } from 'src/server/organizations/organizations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    UsersModule,
    EmployeesModule,
    AuthModule,
    ApplicationConfigModule,
    OrganizationsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ApplicationConfigService],
})
export class AppModule {
  constructor(
    private readonly applicationConfigService: ApplicationConfigService,
  ) {
    this.applicationConfigService.getEndpointFor('')
  }
}