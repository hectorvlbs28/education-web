import { IDocumentData } from './document-response-data.interface';

export interface ISignNowService {
  getAccessToken(): Promise<string>;
  prefillDocumentFields(documentId: string, fields: any): Promise<any>;
  getUrlDocument(documentId: string): Promise<string>;
  signDocument(documentId: string, sign?: string): Promise<any>;
  sendInviteSignature(documentId: string, data: any): Promise<any>;
  getRoleIdByDocumentId(documentId: string): Promise<string>;
  getDocumentById(documentId: string): Promise<IDocumentData>;
}
