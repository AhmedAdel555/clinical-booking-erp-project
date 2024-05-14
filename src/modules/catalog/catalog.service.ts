import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Catalog } from 'src/DB/Schemas/catalog.schema';
import { CatalogBodyDto } from './dto/catalog.dto';

@Injectable()
export class catsrvice {

  constructor(
    @InjectModel(Catalog.name) private catalogmodel: Model<Catalog>,
  ) {}


  async createCatalog(body: CatalogBodyDto): Promise<Catalog> {

    const catalogExist = await this.catalogmodel.findOne({ catalog_name: body.catalogName });
    if (catalogExist) {
      throw new BadRequestException('Catalog name is elready exist');
    }

    const catalog = new this.catalogmodel({ catalog_name: body.catalogName });

    return catalog.save()
  }

  async findAll(): Promise<Catalog[]> {
    return this.catalogmodel.find().exec();
  }
  
}
