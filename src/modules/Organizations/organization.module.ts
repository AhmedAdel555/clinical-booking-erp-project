import { Module } from '@nestjs/common';
import { Models } from 'src/DB/models.generations';
import { JwtService } from '@nestjs/jwt';
import { organizationController } from './organization.controller';
import { organizationServices } from './organization.service';

@Module({
  imports: [Models],
  controllers: [organizationController],
  providers: [organizationServices, JwtService],
})
export class orgModule {}
