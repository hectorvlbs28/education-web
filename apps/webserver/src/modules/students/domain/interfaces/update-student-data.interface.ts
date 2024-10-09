export interface IUpdateStudentData {
  id: string;
  fullName?: string;
  gender?: string;
  birthDate?: Date;
  address?: IAddressUpdate;
  curp?: string;
  lastDegreeStudy?: string;
  phone?: string;
  younger?: boolean;
  studyModality?: string;
  fatherFullName?: string;
  avatar?: string;
}

export interface IAddressUpdate {
  id?: number;
  zipCode?: number;
  city?: string;
  state?: string;
  country?: string;
  streetName?: string;
}
