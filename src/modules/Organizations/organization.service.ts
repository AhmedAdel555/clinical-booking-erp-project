import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organization } from 'src/DB/Schemas/organization.schema';
import { OrganizationDto } from './dto/organization.dto';




@Injectable()
export class organizationServices {
  constructor(
    @InjectModel(Organization.name) private orgModel :Model<Organization>
  ) {}
  
  async createOrg(organizationBodyDto: OrganizationDto): Promise<Organization> {
       
    const createdOrganization = new this.orgModel({
      name: organizationBodyDto.name,
      Bank_account: organizationBodyDto.Bank_account,
      License_ID: organizationBodyDto.License_ID,
      Financial_Limit_From: organizationBodyDto.Financial_Limit_From,
      Financial_Limit_TO: organizationBodyDto.Financial_Limit_TO
    });
    return createdOrganization.save();
  }

  async findAllOrganizations(){
    return this.orgModel.find().exec();
  }
}
