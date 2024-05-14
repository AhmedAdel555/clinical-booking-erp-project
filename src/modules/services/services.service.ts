import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service } from 'src/DB/Schemas/service.schema';
import { CreateServiceDTO } from './dto/create-Service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name)
    private serviceModel: Model<Service>,
  ) {}

  async createNewService(service: CreateServiceDTO): Promise<Service> {

    const newService = new this.serviceModel({
         service_name: service.service_name,
         service_description: service.service_description,
         service_fees_amount:  service.service_fees_amount,
         service_fees_description: service.service_fees_description,
         organization: "663e4c135accec015e83fd7d" // it will updated
    })

    return newService.save()
  }
}
