import { createSlice } from '@reduxjs/toolkit';

interface ContactInformation {
  name: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  email: string;
}
interface Profile {
  gender: string;
  birthdate: string;
  isMinor: boolean;
  fatherOrGuardianName: string;
  nationality: string;
  educationalAttainment: string;
  hasCurp: string;
  curp: string;
  studyFormat: string;
}
interface Document {
  fileName: string;
  file: string;
}
interface DocuemntationMexican {
  acta: Document;
  curp: Document;
  ineFront: Document;
  ineBack: Document;
  certificateOfStudies: Document;
  paymentReceipt: Document;
}

interface DocumentationForeignerCurp {
  dni: Document;
  curp: Document;
  certificateOfStudies: Document;
  paymentReceipt: Document;
}

interface DocumentationForeignerNoCurp {
  dni: Document;
  paymentReceipt: Document;
}

interface enrollState {
  formType: string;
  selectedCourse: string;
  courseStartDate: string;
  courseSchedule: string;
  contactInformation: ContactInformation;
  profile: Profile;
  isContractGenerated: boolean;
  documentationMexican: DocuemntationMexican;
  documentationForeignerCurp: DocumentationForeignerCurp;
  documentationForeignerNoCurp: DocumentationForeignerNoCurp;
  requiresPaymentReceipt: boolean;
  contractId: string;
  courseId: string;
  price: number;
  paymentId: string;
}

const initialState: enrollState = {
  formType: '',
  selectedCourse: '',
  courseStartDate: '',
  courseSchedule: '',
  contactInformation: {
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
    email: '',
  },
  profile: {
    gender: '',
    birthdate: '',
    isMinor: false,
    fatherOrGuardianName: 'N/A',
    nationality: '',
    educationalAttainment: '',
    hasCurp: 'Si',
    curp: 'N/A',
    studyFormat: '',
  },
  isContractGenerated: false,
  documentationMexican: {
    acta: { fileName: '', file: '' },
    curp: { fileName: '', file: '' },
    ineFront: { fileName: '', file: '' },
    ineBack: { fileName: '', file: '' },
    certificateOfStudies: { fileName: '', file: '' },
    paymentReceipt: { fileName: '', file: '' },
  },
  documentationForeignerCurp: {
    dni: { fileName: '', file: '' },
    curp: { fileName: '', file: '' },
    certificateOfStudies: { fileName: '', file: '' },
    paymentReceipt: { fileName: '', file: '' },
  },
  documentationForeignerNoCurp: {
    dni: { fileName: '', file: '' },
    paymentReceipt: { fileName: '', file: '' },
  },
  requiresPaymentReceipt: true,
  contractId: '',
  courseId: '',
  price: 0,
  paymentId: '',
};

export const enrollSlice = createSlice({
  name: 'enroll',
  initialState,
  reducers: {
    setCourse: (state, action) => {
      const {
        formType,
        selectedCourse,
        courseStartDate,
        courseSchedule,
        courseId,
        price,
      } = action.payload;

      state.formType = formType;
      state.selectedCourse = selectedCourse;
      state.courseStartDate = courseStartDate;
      state.courseSchedule = courseSchedule;
      state.courseId = courseId;
      state.price = price;
    },
    setContactInformation: (state, action) => {
      const {
        name,
        phone,
        address,
        postalCode,
        city,
        state: State,
        country,
        email,
      } = action.payload;

      state.contactInformation = {
        name,
        phone,
        address,
        postalCode,
        city,
        state: State,
        country,
        email,
      };
    },
    setProfile: (state, action) => {
      const {
        gender,
        birthdate,
        isMinor,
        fatherOrGuardianName,
        nationality,
        educationalAttainment,
        hasCurp,
        curp,
        studyFormat,
      } = action.payload;

      state.profile = {
        gender,
        birthdate,
        isMinor,
        fatherOrGuardianName,
        nationality,
        educationalAttainment,
        hasCurp,
        curp,
        studyFormat,
      };
    },
    setContractGenerated: (state, action) => {
      const { isContractGenerated } = action.payload;
      state.isContractGenerated = isContractGenerated;
    },
    setDocumentationMexican: (state, action) => {
      const {
        acta,
        curp,
        ineFront,
        ineBack,
        certificateOfStudies,
        paymentReceipt,
      } = action.payload;

      state.documentationMexican = {
        acta,
        curp,
        ineFront,
        ineBack,
        certificateOfStudies,
        paymentReceipt,
      };
    },
    setDocumentationForeignerCurp: (state, action) => {
      const { dni, curp, certificateOfStudies, paymentReceipt } =
        action.payload;

      state.documentationForeignerCurp = {
        dni,
        curp,
        certificateOfStudies,
        paymentReceipt,
      };
    },
    setDocumentationForeignerNoCurp: (state, action) => {
      const { dni, paymentReceipt } = action.payload;

      state.documentationForeignerNoCurp = {
        dni,
        paymentReceipt,
      };
    },
    setContractId: (state, action) => {
      const { contractId } = action.payload;
      state.contractId = contractId;
    },
    setRequiresPaymentReceipt: (state, action) => {
      const { requiresPaymentReceipt, paymentId } = action.payload;
      state.requiresPaymentReceipt = requiresPaymentReceipt;
      state.paymentId = paymentId;
    },
    resetAll: (state) => {
      state.formType = '';
      state.selectedCourse = '';
      state.courseStartDate = '';
      state.courseSchedule = '';
      state.contactInformation = {
        name: '',
        phone: '',
        address: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
        email: '',
      };
      state.profile = {
        gender: '',
        birthdate: '',
        isMinor: false,
        fatherOrGuardianName: 'N/A',
        nationality: '',
        educationalAttainment: '',
        hasCurp: 'Si',
        curp: 'N/A',
        studyFormat: '',
      };
      state.isContractGenerated = false;
      state.documentationMexican = {
        acta: { fileName: '', file: '' },
        curp: { fileName: '', file: '' },
        ineFront: { fileName: '', file: '' },
        ineBack: { fileName: '', file: '' },
        certificateOfStudies: { fileName: '', file: '' },
        paymentReceipt: { fileName: '', file: '' },
      };
      state.documentationForeignerCurp = {
        dni: { fileName: '', file: '' },
        curp: { fileName: '', file: '' },
        certificateOfStudies: { fileName: '', file: '' },
        paymentReceipt: { fileName: '', file: '' },
      };
      state.documentationForeignerNoCurp = {
        dni: { fileName: '', file: '' },
        paymentReceipt: { fileName: '', file: '' },
      };
      state.requiresPaymentReceipt = true;
      state.contractId = '';
      state.courseId = '';
      state.price = 0;
      state.paymentId = '';
    },
  },
});

export const {
  setCourse,
  resetAll,
  setContactInformation,
  setProfile,
  setContractGenerated,
  setDocumentationMexican,
  setDocumentationForeignerCurp,
  setDocumentationForeignerNoCurp,
  setContractId,
  setRequiresPaymentReceipt,
} = enrollSlice.actions;

export const selectContactInformation = (state: { enroll: enrollState }) => {
  return state.enroll.contactInformation;
};

export const selectProfile = (state: { enroll: enrollState }) => {
  return state.enroll.profile;
};

export const selectDocumentationMexican = (state: { enroll: enrollState }) => {
  return state.enroll.documentationMexican;
};

export const selectDocumentationForeignerCurp = (state: {
  enroll: enrollState;
}) => {
  return state.enroll.documentationForeignerCurp;
};

export const selectDocumentationForeignerNoCurp = (state: {
  enroll: enrollState;
}) => {
  return state.enroll.documentationForeignerNoCurp;
};

export default enrollSlice.reducer;
