import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { authModule } from './modules/Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { orgModule } from './modules/Organizations/organization.module';
import { catModule } from './modules/catalog/catalog.module';
import { UsersModule } from './modules/users/users.module';
import { ServicesModule } from './modules/services/services.module';
import { BookingsModule } from './modules/bookings/bookings.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://mongo_user:Ahmed123456@cluster0.0abffrs.mongodb.net/'),
    authModule,
    orgModule,
    catModule,
    ServicesModule,
    UsersModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
