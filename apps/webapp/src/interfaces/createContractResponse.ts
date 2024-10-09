interface Payment {
  level: string;
  amount: string;
  paymentDate: Date;
}

interface Student {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  birthDate: Date;
  curp: string;
  lastDegreeStudy: string;
  phone: string;
  address: string;
  nationality: string;
  younger: boolean;
  fatherFullName: string;
  studyModality: string;
  createdAt: Date;
}

interface CreateContractResponse {
  data: {
    id: string;
    annualRegistration: string;
    curp: string;
    dateBirthStudent: Date;
    modality: string;
    monthlyPayments: Payment[];
    scholarship: string;
    schoolName: string;
    startDateService: Date;
    studentPhone: string;
    studentsNanme: string;
    student: Student;
    createdAt: Date;
  };
  statusCode: number;
}

export default CreateContractResponse;
