import { CoreErrorVisitor } from './core-error-visitor.interface';

export interface VisitableError {
  accept(visitor: CoreErrorVisitor): boolean;
}
