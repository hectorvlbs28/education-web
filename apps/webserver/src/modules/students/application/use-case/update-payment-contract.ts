import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { CONTRACT_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IContractRepository } from '../../domain/interfaces/contract-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { IPayloadUpdatePayment } from '../../domain/interfaces/response-percent-payment-register.interface';

@Injectable()
export class UpdatePaymentContract implements IUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>
  ) {}

  public async process(payload: IPayloadUpdatePayment): Promise<Contract> {
    const { discount, monthlyPayment, type, contractId } = payload;
    const contract = await this.contractRepository.findById(contractId);
    contract.assignDiscount(type, discount, monthlyPayment);
    return this.contractRepository.persist(contract);
  }
}
