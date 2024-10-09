interface Address {
  id: number | null;
  city: string;
  country: string;
  streetName: string;
  createdAt: string;
  state: string;
  zipCode: number;
}

interface Contract {
  id: string;
  annualRegistration: string;
  curp: string;
  dateBirthStudent: string;
  modality: string;
  activatedContract: boolean;
  monthlyPayments: any[];
  scholarship: string;
  schoolName: string;
  startDateService: string;
  studentPhone: string;
  studentsNanme: string;
  documentId: string;
  signature: boolean;
  createdAt: string;
}

interface Course {
  id: string;
  name: string;
  description: string;
  contract: Contract;
  createdAt: string;
}

interface Student {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  birthDate: string;
  curp: string;
  lastDegreeStudy: string;
  phone: string;
  addresses: Address[];
  courses: Course[];
  nationality: string;
  younger: boolean;
  fatherFullName: string;
  studyModality: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  students: Student[];
  createdAt: string;
}

interface MeResponse {
  data: User;
  statusCode: number;
}

export default MeResponse;
