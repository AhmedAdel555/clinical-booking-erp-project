import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { Models } from 'src/DB/models.generations';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [Models, NotificationsModule],
  controllers: [BookingsController],
  providers: [BookingsService]
})
export class BookingsModule {}
