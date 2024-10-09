import { DomainException } from './base/domain.exception';

export class InvalidEmailException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
