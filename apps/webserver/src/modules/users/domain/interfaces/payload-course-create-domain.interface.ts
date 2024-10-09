import { Identifier } from '../../../core/domain/value-objects/identifier';
import { IAttachmentToJson } from './attachment.interface';
import { IContractToJsonResponse } from './contract-tojson-reponse.interface';

export interface IPayloadCourseCreateDomain {
  id: Identifier;
  name: string;
  description: string;
}

export interface IResponseCourseToJson {
  id: string;
  name: string;
  description: string;
  contracts?: IContractToJsonResponse[];
  attachments?: IAttachmentToJson[];
  createdAt: Date;
}
