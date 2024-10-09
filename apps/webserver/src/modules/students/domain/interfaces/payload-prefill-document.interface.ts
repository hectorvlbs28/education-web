import { IResponseToJsonAddress } from './payload-address-domain.interface';

export interface IPayloadPrefillDocument {
  fullName: string;
  schoolName: string;
  dateBirthStudent: string;
  curp: string;
  address: string;
  phone: string;
  scholarship: string;
  startDateService: string;
  modality: string;
  createdAt: string;
  email?: string;
  roleId?: string;
}
