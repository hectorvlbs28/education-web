import { Inject, Injectable } from '@nestjs/common';
import { IUseCase } from '../../../core/domain/interfaces/use-case.interface';
import { SIGN_NOW_SERVICE } from '../../../core/infrastruture/constants/inject-tokens';
import { ISignNowService } from '../../../core/domain/interfaces/docusign-service.interface';
import { CONTRACT_REPOSITORY } from '../../infrastructure/constants/inject-tokens';
import { IContractRepository } from '../../domain/interfaces/contract-repository.interface';
import { Contract } from '../../domain/entities/contract';

@Injectable()
export class GetContractById implements IUseCase {
  constructor(
    @Inject(SIGN_NOW_SERVICE)
    private readonly signNowService: ISignNowService,
    @Inject(CONTRACT_REPOSITORY)
    private readonly contractRepository: IContractRepository<Contract>
  ) {}

  public async process(contractId: string): Promise<Contract> {
    const contract = await this.contractRepository.findById(contractId);
    const { documentId } = contract.toJSON();
    const document = await this.signNowService.getDocumentById(documentId);
    if (document.signatures.length > 0) {
      contract.assignSignature();
    }
    return this.contractRepository.persist(contract);
  }
}
