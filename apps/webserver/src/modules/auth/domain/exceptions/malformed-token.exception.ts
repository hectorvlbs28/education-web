import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class MalformedTokenException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = MalformedTokenException.name;
  }
}
