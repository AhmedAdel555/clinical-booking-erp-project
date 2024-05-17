import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";


@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(receviedUser: string, message:string, subject: string) {

    await this.mailService.sendMail({
      from: "hamadadola.2002@gmail.com",
      to: receviedUser,
      subject: subject,
      text: message,
    });
  }
}