import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreatePayment } from '../../application/use-case/create-payment';
import { PayloadPaymentSendDto } from '../dtos/payload-payment-send.dto';
import { LoginGuard } from '../../../auth/infrastructure/guards/login.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { WebhookStripeData } from '../../application/use-case/webhook-stripe-data';
import { Request, Response } from 'express';

@Controller('payments')
@ApiTags('Payments')
@ApiBearerAuth('JWT')
export class StripeController {
  constructor(
    private readonly createPayment: CreatePayment,
    private readonly webhookStripeData: WebhookStripeData
  ) {}

  @Post('/send')
  @UseGuards(LoginGuard)
  public async createPaymentStripe(@Body() payload: PayloadPaymentSendDto) {
    return this.createPayment.process(payload);
  }

  @Post('/webhook')
  @HttpCode(200)
  public getDataWebHook(@Req() request: Request): void {
    this.webhookStripeData.process(request);
  }
}
