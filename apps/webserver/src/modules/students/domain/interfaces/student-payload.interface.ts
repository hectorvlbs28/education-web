export interface IStudentPayload {
  fullName: string;
  email: string;
  gender: string;
  curp: string;
  lastDegreeStudy: string;
  phone: string;
  address: IAddress;
  nationality: string;
  younger: boolean;
  fatherFullName?: string;
  birthDate: Date;
  studyModality: string;
  userId: string;
  courseId: string;
}

export interface ICoursesPayloadUseCase {
  name: string;
  description: string;
}

export interface IAddress {
  zipCode: number;
  city: string;
  state: string;
  country: string;
  streetName: string;
}
