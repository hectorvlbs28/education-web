import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import {
  CONTRACT_REPOSITORY,
  STRIPE_SERVICE,
} from '../../infrastructure/constants/inject-tokens';
import { IStripeService } from '../../domain/interfaces/stripe-service.interface';
import { IContractRepository } from '../../domain/interfaces/contrac-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { MAIL_PROVIDER_SERVICE } from '../../../core/infrastruture/constants/inject-tokens';
import { IMailProviderService } from '../../../core/domain/interfaces/mail-provider-service.interface';

@Injectable()
export class WebhookStripeData implements IUseCase {
  constructor(
    @Inject(STRIPE_SERVICE)
    private readonly stripeService: IStripeService,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>,
    @Inject(MAIL_PROVIDER_SERVICE)
    private readonly mailProvideService: IMailProviderService
  ) {}

  public async process(body: any): Promise<void> {
    const paymentIntentId = this.stripeService.listeningEventsStripe(body);
    if (paymentIntentId) {
      let level: string = null;
      const { description, email, amount, name } =
        await this.stripeService.getLineItem(paymentIntentId);
      const emailAccount = await this.stripeService.getEmailAccount();
      const dataItemSplit = description.split('-');
      const contractId = dataItemSplit[1];
      const type = dataItemSplit[2];
      level = dataItemSplit[3] && dataItemSplit[3];
      const contract = await this.contractRepository.findById(contractId);
      const { course } = contract.toJSON();
      contract.assignPayment(paymentIntentId, type, level);
      await this.mailProvideService.sendPaymentsConfirm({
        amount,
        course: course.name,
        email,
        emailStripe: emailAccount,
        name,
      });
      await this.contractRepository.persist(contract);
    }
  }
}
