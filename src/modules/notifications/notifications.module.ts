import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: "ahmedbassiouni555@gmail.com",
          pass: "osuh kxnx rhjy bicl"
        },
        tls: {
          rejectUnauthorized: false,
        }
      }
    }),
  ],
  providers: [MailService],
  exports: [MailService]
})
export class NotificationsModule {}
