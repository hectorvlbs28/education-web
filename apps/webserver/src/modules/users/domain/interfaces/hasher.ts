import { IEncryptor } from './encryptor';

export interface IHasher extends Omit<IEncryptor, 'decrypt'> {
  compare(plainData: string, hashedData: string): Promise<boolean>;
}
