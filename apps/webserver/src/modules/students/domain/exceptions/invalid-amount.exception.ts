import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class InvalidAmountException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = InvalidAmountException.name;
  }
}
