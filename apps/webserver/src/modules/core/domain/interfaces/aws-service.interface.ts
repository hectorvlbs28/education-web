export interface IAwsService {
  putFile(key: string, body: Buffer): Promise<any>;
  getUrl(key: string): Promise<string>;
}
