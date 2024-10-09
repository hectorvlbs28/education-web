import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class InvalidSignatureException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = InvalidSignatureException.name;
  }
}
