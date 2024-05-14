import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CreateServiceDTO } from './dto/create-Service.dto';
import { ServicesService } from './services.service';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/modules/Auth/role.guard';
import { AuthGuard } from '../Auth/auth.guard';

@Controller('services')
export class ServicesController {

  constructor(
    private servicesService:  ServicesService
  ) {}


  @Roles(['Admin'])
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async createService(@Body() serviceDTO: CreateServiceDTO){
    await this.servicesService.createNewService(serviceDTO); 
    return {message: "Service created Successfully"}
  }
}
