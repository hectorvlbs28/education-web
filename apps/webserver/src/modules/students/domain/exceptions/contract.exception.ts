import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class ContractActiveException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = ContractActiveException.name;
  }
}
