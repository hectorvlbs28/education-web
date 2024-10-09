import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class InvalidFileTypeException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = InvalidFileTypeException.name;
  }
}
