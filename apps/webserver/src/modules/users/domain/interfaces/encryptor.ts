export interface IEncryptor {
  encrypt(dataToEncrypt: string): Promise<string>;
}
