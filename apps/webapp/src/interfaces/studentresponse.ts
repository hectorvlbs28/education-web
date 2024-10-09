interface Address {
  id: string | null;
  city: string;
  country: string;
  streetName: string;
  createdAt: string;
  state: string;
  zipCode: number;
}

interface Course {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
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
  nationality: string;
  younger: boolean;
  fatherFullName: string;
  studyModality: string;
  user: User;
  courses: Course[];
  createdAt: string;
}
interface StudentResponse {
  data: Student;
  statusCode: number;
}

export default StudentResponse;
