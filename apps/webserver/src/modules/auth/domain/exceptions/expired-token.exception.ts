import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class ExpiredTokenException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = ExpiredTokenException.name;
  }
}
