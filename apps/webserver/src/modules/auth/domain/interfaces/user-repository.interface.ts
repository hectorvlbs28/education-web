import { IRepository } from '../../../core/domain/interfaces/repository';

export interface IUserRepository<T> extends IRepository<T> {
  findByEmail(email: string): Promise<T>;
  findByEmailOrFail(email: string): Promise<T>;
}
