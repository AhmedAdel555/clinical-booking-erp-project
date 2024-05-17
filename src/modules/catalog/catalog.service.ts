import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from 'src/DB/Schemas/catalog.schema';
import { CatalogBodyDto } from './dto/catalog.dto';

@Injectable()
export class catsrvice {

  constructor(
    @InjectModel(Catalog.name) private catalogmodel: Model<Catalog>,
  ) {}


  async createCatalog(body: CatalogBodyDto){

    const catalogExist = await this.catalogmodel.findOne({ catalog_name: body.catalogName }).exec();

    if (catalogExist) {
      throw new BadRequestException('Catalog name is elready exist');
    }

    const catalog = new this.catalogmodel({ catalog_name: body.catalogName });

    const newCatalog = await catalog.save()

    if(!newCatalog){
      throw new InternalServerErrorException('fail to save catalog');
    }
  }

  async findAll(): Promise<Catalog[]> {
    return this.catalogmodel.find().exec();
  }
  
}
