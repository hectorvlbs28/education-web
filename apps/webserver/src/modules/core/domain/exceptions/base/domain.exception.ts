import { CoreErrorVisitor } from '../../interfaces/core-error-visitor.interface';
import { VisitableError } from '../../interfaces/visitable-error.interface';

export class DomainException extends Error implements VisitableError {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  accept(visitor: CoreErrorVisitor): boolean {
    return visitor.visitDomainException(this);
  }
}
