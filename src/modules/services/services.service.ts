import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Service } from 'src/DB/Schemas/service.schema';
import { CreateServiceDTO } from './dto/create-Service.dto';
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
         service_name: service.serviceName,
         service_description: service.serviceDescription,
         service_fees_amount:  service.serviceFeesAmount,
         service_fees_description: service.serviceFeesDescription,
         organization: user.organization
    })

    const savedService = await newService.save()
    
    if(!savedService){
      throw new InternalServerErrorException('fail to add service');
    }
  }

  async findServiceById(serviceId: string){
    return await this.serviceModel.findById(serviceId).populate('organization').exec();
  }

  async findOrganizationServices(organizationId : string){
    return this.serviceModel.find({organization: new Types.ObjectId(organizationId)}).exec();
  }

}
