export interface IPayloadCreateDocument {
  document_name: string;
  texts: ITexts[];
}

interface ITexts {
  page_number: number;
  data: any;
  x: number;
  y: number;
  font: string;
  line_height: number;
  size: number;
}

export interface IPayloadDataDocument {
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
}
