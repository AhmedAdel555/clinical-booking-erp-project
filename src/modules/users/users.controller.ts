import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _userservice: UsersService) {}
  
  @Get('/:id')
  async getbyid(@Param('id') id: string) {
    return await this._userservice.getUserbyId(id);
  }


  @Get('/agents')
  async getAllAgents() {
    return await this._userservice.getAllAgents();
  }
  

  @Get('/agent/:id')
  async getAgentById(@Param('id') id: string) {
    return await this._userservice.getAgentById(id);
  }
  

  @Get('/agents/services/:serviceId')
  async getAgentsOfService(@Param('serviceId') serviceId: string) {
    return await this._userservice.getAgentsByService(serviceId);
  }


  @Get('/agents/catalogs/:catalogId')
  async getAgentsOfCatalog(@Param('catalogId') catalogId: string) {
    return await this._userservice.getAgentsByCatalog(catalogId);
  }

  
}
