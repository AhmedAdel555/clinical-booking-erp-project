import {Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { organizationServices } from './organization.service';
import { OrganizationDto } from './dto/organization.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { RoleGuard } from 'src/modules/Auth/role.guard';
import { AuthGuard } from '../Auth/auth.guard';


@Controller({ path: '/organization' })
export class organizationController {

  constructor(private readonly orgServices: organizationServices) {}

  @Roles(['Super Admin'])
  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  async createOrganization(@Body() organizationBodyDto: OrganizationDto){
    await this.orgServices.createOrg(organizationBodyDto);
    return {message: "Organization is created"}
  }

  @Get()
  async findAllOrganization(){
    return this.orgServices.findAllOrganizations();
  }
}
 