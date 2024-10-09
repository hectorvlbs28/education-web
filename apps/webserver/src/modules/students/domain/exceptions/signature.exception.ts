import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class SignatureErrorException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = SignatureErrorException.name;
  }
}
