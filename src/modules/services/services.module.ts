import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Models } from 'src/DB/models.generations';

@Module({
  imports: [Models],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
