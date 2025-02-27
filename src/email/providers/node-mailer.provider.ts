import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorManager } from 'src/common/exception-filters/error-manager.filter';
import * as nodemailer from 'nodemailer';

@Injectable()
export class NodeMailerProvider {
  private transporter: nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    const user = this.configService.get<string>('EMAIL_USER');
    const pass = this.configService.get<string>('EMAIL_PASSWORD');

    if (!user || !pass) {
      throw new ErrorManager({
        type: 'NOT_FOUND',
        message: 'Missing configuration variables required for mail',
      });
    }

    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user,
        pass,
      },
    });
  }

  async sendEmail(subject: string, send_to: string, html: string) {
    try {
      await this.transporter.sendMail({ to: send_to, subject, html });
    } catch (error) {
      console.log(error);
      throw error instanceof Error
        ? ErrorManager.createErrorSignature(error.message)
        : ErrorManager.createErrorSignature('An unexpected error occurred');
    }
  }
}
