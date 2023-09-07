import { Injectable, HttpStatus } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  static sendEmail: any;
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(email: string, subject: string, html: string): Promise<void> {
    try {
      const mailService = this.configService.get<string>('MAIL_SERVICE');
      const mailUser = this.configService.get<string>('MAIL_USER');
      const mailPass = this.configService.get<string>('MAIL_PASS');

      const config = {
        host: mailService,
        port: 587,
        secure: false,
        auth: {
          user: mailUser,
          pass: mailPass,
        },
      };

      const transporter = nodemailer.createTransport(config);

      const message = {
        from: process.env.MAIL_USER,
        to: email,
        subject: subject,
        html: html,
      };

      await transporter.sendMail(message);

      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error while sending email:', error);
      if (error.responseCode === HttpStatus.REQUEST_TIMEOUT) {
        console.error('Invalid or non-existent email address');
      } else {
        console.error('Other email sending error:', error.message);
      }
    }
  }
}
