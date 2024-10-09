export interface IPayloadUploadFileStudent {
  studentId: string;
  files: Buffer[];
  attachments: IAttachmentPayload[];
  courseId: string;
}

export interface IAttachmentPayload {
  name: string;
  fileName: string;
  mediaType: string;
  extension: string;
  documentType?: string;
}
