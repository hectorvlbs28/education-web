import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { CONTRACT_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IContractRepository } from '../../domain/interfaces/contract-repository.interface';
import { Contract } from '../../domain/entities/contract';
import { IPaymentPayload } from '../../domain/interfaces/annual-payment-payload.interface';
import { IMonthlyPayment } from '../../domain/interfaces/monthly-payment.interface';
import { CourseCategoryEnum } from '../../../core/domain/enums/course-category.enum';

@Injectable()
export class MonthlyPayment implements IUseCase {
  constructor(
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>
  ) {}

  public async process(payload: IPaymentPayload): Promise<IMonthlyPayment[]> {
    const { contractId, paymentDate, level } = payload;
    const contract = await this.contractRepository.findById(contractId);
    if (
      contract.toJSON().course.courseCategory === CourseCategoryEnum.SPECIALTY
    ) {
      return contract.thirtyPercentDiscount(paymentDate, level);
    }
    return contract.responseWithoutDiscounts(paymentDate, level);
  }
}
