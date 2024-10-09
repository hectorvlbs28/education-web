import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { CONTRACT_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IContractRepository } from '../../domain/interfaces/contract-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { IPaymentPayload } from '../../domain/interfaces/annual-payment-payload.interface';
import { IResponsePercentPaymentRegister } from '../../domain/interfaces/response-percent-payment-register.interface';
import { CourseCategoryEnum } from '../../../core/domain/enums/course-category.enum';

@Injectable()
export class AnnualPayment implements IUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>
  ) {}

  public async process(
    payload: IPaymentPayload
  ): Promise<IResponsePercentPaymentRegister> {
    const { contractId, paymentDate } = payload;
    const contract = await this.contractRepository.findById(contractId);
    const { annualRegistration, course } = contract.toJSON();
    if (course.courseCategory === CourseCategoryEnum.SPECIALTY) {
      return contract.twentyPercentDiscount(
        paymentDate,
        Number(annualRegistration)
      );
    }
    return {
      amount: Number(annualRegistration),
      discount: 0,
      total: Number(annualRegistration),
    };
  }
}
