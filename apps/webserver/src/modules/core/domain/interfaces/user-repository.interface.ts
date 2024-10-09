export interface IUserRepository<T> {
  findByEmail(email: string): Promise<T>;
  findById(userId: string): Promise<T>;
}
