import { DomainException } from '../../../core/domain/exceptions/base/domain.exception';

export class UnauthorizedException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = UnauthorizedException.name;
  }
}
