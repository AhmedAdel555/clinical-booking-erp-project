import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Models } from 'src/DB/models.generations';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [Models, UsersModule],
  controllers: [ServicesController],
  providers: [ServicesService]
})
export class ServicesModule {}
