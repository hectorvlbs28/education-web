interface CreateStudentBody {
  fullName: string;
  email: string;
  gender: string;
  birthDate: string;
  curp: string;
  lastDegreeStudy: string;
  phone: string;
  address: {
    zipCode: number;
    city: string;
    state: string;
    country: string;
    streetName: string;
  };
  nationality: string;
  younger: boolean;
  fatherFullName: string;
  studyModality: string;
  courseId: string;
}

export default CreateStudentBody;
