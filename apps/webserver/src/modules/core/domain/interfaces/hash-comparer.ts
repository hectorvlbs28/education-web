export interface IHashComparer {
  compare(plainData: string, hashedData: string): Promise<boolean>;
}
