import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/DB/Schemas/user.schema';
import { SignUpDTO } from '../Auth/dto/signup.dto';
import { SignUpAdminDTO } from '../Auth/dto/signup-admin.dto';
import { SignUpAgentDTO } from '../Auth/dto/signup-agent.dto';
import { Organization } from 'src/DB/Schemas/organization.schema';
import { Service } from 'src/DB/Schemas/service.schema';
import { Catalog } from 'src/DB/Schemas/catalog.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Organization.name) private organizationModel: Model<Organization>,
    @InjectModel(Service.name) private serviceModel: Model<Service>,
    @InjectModel(Catalog.name) private catalogModel: Model<Catalog>
) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDTO: SignUpDTO): Promise<User> {
    const createdUser = new this.userModel({
      NationalId: createUserDTO.NationalId,
      email: createUserDTO.email,
      password: createUserDTO.password,
      phone: createUserDTO.phone,
      username: createUserDTO.username,
      status: 'Active',
      role: 'User',
    });
    return createdUser.save();
  }

  async createAdmin(createUserDTO: SignUpAdminDTO, superAdminId: string) {

    const organization = this.organizationModel.findById(createUserDTO.organizationId);

    const user = this.userModel.findById(superAdminId);

    const createdUser = new this.userModel({
      NationalId: createUserDTO.NationalId,
      email: createUserDTO.email,
      password: createUserDTO.password,
      phone: createUserDTO.phone,
      username: createUserDTO.username,
      status: 'Active',
      role: 'Admin',
      organization: organization,
      createdByUser: user
    });
    return createdUser.save();
  }

  async createAgent(createUserDTO: SignUpAgentDTO, adminId: string) {

    const catalog =  await this.catalogModel.findById(createUserDTO.catalog_id);

    const admin = await this.userModel.findById(adminId).exec();

    const service = await this.serviceModel.findById(createUserDTO.serviceId);

    const createdUser = new this.userModel({
      NationalId: createUserDTO.NationalId,
      email: createUserDTO.email,
      password: createUserDTO.password,
      phone: createUserDTO.phone,
      username: createUserDTO.username,
      status: 'Active',
      role: 'Agent',
      catalog: catalog,
      organization: admin.organization,
      createdByUser: admin,
      available_dates: createUserDTO.available_dates,
      cash_acceptance: createUserDTO.cash_acceptance,
      service: service,
    });

    return createdUser.save();
  }

  async getUserbyId(userId: string) {
    const user = await this.userModel.findById({ userId });

    if (!user) {
      throw new BadRequestException('user is not fount');
    }

    return user;
  }

  async getAllAgents() {
    return await this.userModel.find({ role: 'Agent' }).exec();
  }

  async getAgentById(agentId: string): Promise<User> {
    const user = await this.userModel
      .findOne({ _id: agentId, role: 'Agent' })
      .exec();

    if (!user) {
      throw new NotFoundException(`Agent not found`);
    }

    return user;
  }

  async getAgentsByService(serviceId: string) {

    const Agents = await this.userModel
      .find({ role: 'Agent', service: serviceId })
      .exec();
    return Agents;
  }

  async getAgentsByCatalog(catalogId: string) {

    const Agents = await this.userModel
      .find({ role: 'Agent', catalog: catalogId })
      .exec();
    return Agents;
  }
}
