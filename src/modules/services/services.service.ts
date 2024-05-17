import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from 'src/DB/Schemas/service.schema';
import { CreateServiceDTO } from './dto/create-Service.dto';
import { UsersService } from '../users/users.service';
import { User } from 'src/DB/Schemas/user.schema';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
    @InjectModel(User.name)
    private userModel: Model<User>
  ) {}

  async createNewService(service: CreateServiceDTO, adminId: string) {

    const user = await this.userModel.findById(adminId).populate('organization').exec();

    const newService = new this.serviceModel({
         service_name: service.service_name,
         service_description: service.service_description,
         service_fees_amount:  service.service_fees_amount,
         service_fees_description: service.service_fees_description,
         organization: user.organization
    })

    const savedService = await newService.save()
    
    if(!savedService){
      throw new InternalServerErrorException('fail to add service');
    }
  }

  async findServiceById(serviceId: string){
    return (await this.serviceModel.findById(serviceId)).populated('organization').exec();
  }

  async findOrganizationServices(organizationId : string){
    return this.serviceModel.find({ organization: organizationId }).exec();
  }
}
