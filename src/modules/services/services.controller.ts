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
  async createService(@Body() serviceDTO: CreateServiceDTO, @Req() req){
    await this.servicesService.createNewService(serviceDTO, req.user.id); 
    return {message: "Service created Successfully"}
  }

  @Get('/:serviceId')
  async findServiceById(@Param('serviceId') serviceId: string){
     return this.servicesService.findServiceById(serviceId);
  }


  @Get('/organizations/:organizationId')
  async findOrganizationServices(@Param('organizationId') organizationId: string){
     return await this.servicesService.findOrganizationServices(organizationId);
  }



}
