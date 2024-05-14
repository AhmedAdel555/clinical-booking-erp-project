import { Body, Controller, Get, Post, Req, Res, UseGuards, UsePipes } from "@nestjs/common";
import { catsrvice } from "./catalog.service";
import { CatalogBodyDto } from "./dto/catalog.dto";
import { RoleGuard } from "src/modules/Auth/role.guard";
import { Roles } from "src/decorators/roles.decorator";
import { AuthGuard } from "../Auth/auth.guard";



@Controller('catalog')
export class catalogController{

    constructor(private readonly catalogService:catsrvice){}

    @Roles(['Super Admin'])
    @UseGuards(AuthGuard, RoleGuard)
    @Post()
    async createCatalog(@Body() catalogBodyDto:CatalogBodyDto){
        await this.catalogService.createCatalog(catalogBodyDto)
        return {message: "Catalog added Successfully"}
    }

    @Get()
    async findAll(){
      return await this.catalogService.findAll()
    }
}
