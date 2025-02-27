import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { NodeMailerProvider } from './providers/node-mailer.provider';

@Module({
  providers: [EmailService, NodeMailerProvider],
  exports: [EmailService],
})
export class EmailModule {}
