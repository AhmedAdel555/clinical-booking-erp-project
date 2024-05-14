import { IsNotEmpty, IsString } from "class-validator";

export class CatalogBodyDto{
    @IsString()
    @IsNotEmpty()
    catalogName:string
}