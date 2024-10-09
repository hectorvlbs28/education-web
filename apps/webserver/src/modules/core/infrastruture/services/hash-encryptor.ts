import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { IEncryptor } from '../../domain/interfaces/encryptor';
import { IHashComparer } from '../../domain/interfaces/hash-comparer';

@Injectable()
export class HashEncryptor implements IEncryptor, IHashComparer {
  private readonly saltOrRounds = 10;

  public async encrypt(dataToEncrypt: string): Promise<string> {
    return bcrypt.hash(dataToEncrypt, this.saltOrRounds);
  }

  public async compare(
    plainData: string,
    hashedData: string
  ): Promise<boolean> {
    return bcrypt.compare(plainData, hashedData);
  }
}
