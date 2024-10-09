import { Identifier } from '../value-objects/identifier';

export interface IRepository<T> {
  nextId(): Identifier;
  findById(id: string): Promise<T>;
  persist(aggregateRoot: T): Promise<T>;
}
