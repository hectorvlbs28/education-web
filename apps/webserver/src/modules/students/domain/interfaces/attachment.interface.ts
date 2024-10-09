export interface IAttachment {
  id?: string;
  name?: string;
  fileName: string;
  mediaType: string;
  extension: string;
  documentType?: string;
}

export interface IAttachmentToJson {
  id?: number;
  name: string;
  fileName: string;
  mediaType: string;
  extension: string;
  documentType?: string;
  createdAt: Date;
}
