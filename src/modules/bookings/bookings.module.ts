import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Models } from 'src/DB/models.generations';

@Module({
  imports: [Models],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
