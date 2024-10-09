import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import {
  IMailProviderService,
  IPayloadSendPayments,
} from '../../domain/interfaces/mail-provider-service.interface';
import { htmlPaymentData } from '../constants/payment-html';

@Injectable()
export class MailProviderService implements IMailProviderService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendStudentConfirmation(email: string) {
    try {
      await this.mailerService.sendMail({
        from: '"No Reply" <noreply@example.com>', // sender address
        to: email, // list of receivers
        subject: 'Inscripción de estudiante', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>', // html body
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async sendPaymentsConfirm(
    payload: IPayloadSendPayments
  ): Promise<void> {
    const { course, email, emailStripe } = payload;
    const html = htmlPaymentData(payload);
    try {
      await this.mailerService.sendMail({
        from: '"No Reply" <noreply@example.com>',
        to: [email, emailStripe], // list of receivers
        subject: 'Inscripción de estudiante', // Subject line
        text: `Pago del curso: ${course} realizado con exito`, // plain text body
        html,
      });
    } catch (error) {
      console.log(error);
    }
  }
}
