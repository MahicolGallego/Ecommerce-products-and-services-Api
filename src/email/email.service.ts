import { Injectable } from '@nestjs/common';
import { NodeMailerProvider } from './providers/node-mailer.provider';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly nodeMailerProvider: NodeMailerProvider,
    private readonly configService: ConfigService,
  ) {}
  async sendEmail(
    subject: string,
    message: string,
    send_to_name: string,
    send_to_email: string,
  ) {
    const html = this.generateMessage(subject, message, send_to_name);
    await this.nodeMailerProvider.sendEmail(subject, send_to_email, html);
  }

  generateMessage(
    subject: string,
    message: string,
    send_to_name: string,
  ): string {
    return /*html*/ `
    <!doctype html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body>
      <h1>${subject}</h1>
      <p>Dear ${send_to_name},</p>
      ${message}
      <p>Best regards</p>
      <p>Your Team</p>
    </body>
    </html>
    `;
  }
}
