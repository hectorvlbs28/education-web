import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import {
  CONTRACT_REPOSITORY,
  STRIPE_SERVICE,
} from '../../infrastructure/constants/inject-tokens';
import { IStripeService } from '../../domain/interfaces/stripe-service.interface';
import { IPayloadPayment } from '../../domain/interfaces/payload-payment.interface';
import { Currencies } from '../../../core/domain/enums/currencies.enum';
import { IPayloadPaymentUseCase } from '../../domain/interfaces/payload-payment-use-case.interface';
import { IContractRepository } from '../../domain/interfaces/contrac-repository.interface';
import { Contract } from '../../domain/entities/contract';

@Injectable()
export class CreatePayment implements IUseCase {
  constructor(
    @Inject(STRIPE_SERVICE)
    private readonly stripeService: IStripeService,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>
  ) {}

  public async process(payload: IPayloadPaymentUseCase): Promise<string> {
    const { amount, currency, contractId, type, level } = payload;
    const contract = await this.contractRepository.findById(contractId);
    const {
      course: { name },
    } = contract.toJSON();
    const convertAmountCent =
      currency === Currencies.MXN ? amount * 100 : amount;
    let contractName: string = '';
    level && (contractName = `${name}-${contractId}-${type}-${level}`);
    !level && (contractName = `${name}-${contractId}-${type}`);
    const payloadPayment: IPayloadPayment = {
      amount: convertAmountCent,
      currency,
      contractName,
    };
    return this.stripeService.checkoutPayment(payloadPayment);
  }
}
