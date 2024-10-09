interface Payment {
  level: string;
  amount: string;
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
  address: string;
  nationality: string;
  younger: boolean;
  fatherFullName: string;
  studyModality: string;
  createdAt: string;
}

interface ConsultContract {
  data: {
    studentsNanme: string;
    schoolName: string;
    dateBirthStudent: string;
    curp: string;
    studentPhone: string;
    scholarship: string;
    startDateService: string;
    modality: string;
    annualRegistration: string;
    monthlyPayments: Payment[];
    student: Student;
    documentId: string;
    signature: boolean;
  };
  statusCode: number;
}

export default ConsultContract;
