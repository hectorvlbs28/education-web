import * as Yup from 'yup';

const errorCodes = {
  required: 'required',
  email: 'email',
  oneOfPassword: 'oneOfPassword',
  maxCharacters50: 'maxCharacters50',
  maxCharacters10: 'maxCharacters10',
  maxCharacters5: 'maxCharacters5',
  maxCharacters18: 'maxCharacters18',
  minCharacters8: 'minCharacters8',
  mustHaveOneLowercase: 'mustHaveOneLowercase',
  mustHaveOneUppercase: 'mustHaveOneUppercase',
  mustHaveOneNumber: 'mustHaveOneNumber',
  mustHaveOneSpecialCharacter: 'mustHaveOneSpecialCharacter',
};

const loginSchema = Yup.object().shape({
  email: Yup.string().email(errorCodes.email).required(errorCodes.required),
  password: Yup.string().required(errorCodes.required),
});

const signUpSchema = Yup.object().shape({
  email: Yup.string().email(errorCodes.email).required(errorCodes.required),
  name: Yup.string()
    .max(50, errorCodes.maxCharacters50)
    .required(errorCodes.required),
  password: Yup.string()
    .required(errorCodes.required)
    .test(
      'password-complexity',
      'Password complexity requirements not met',
      function (value) {
        const errors = [];
        if (!/(?=.*[a-z])/.test(value || ''))
          errors.push(errorCodes.mustHaveOneLowercase);
        if (!/(?=.*[A-Z])/.test(value || ''))
          errors.push(errorCodes.mustHaveOneUppercase);
        if (!/(?=.*\d)/.test(value || ''))
          errors.push(errorCodes.mustHaveOneNumber);
        if (!/(?=.*[!@#$%^&*])/.test(value || ''))
          errors.push(errorCodes.mustHaveOneSpecialCharacter);
        if ((value || '').length < 8) errors.push(errorCodes.minCharacters8);

        if (errors.length > 0) {
          return this.createError({ message: errors.join('\n') });
        }
        return true;
      }
    ),
});

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email(errorCodes.email).required(errorCodes.required),
});

const contactInformationSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, errorCodes.maxCharacters50)
    .required(errorCodes.required),
  phone: Yup.string().max(10, errorCodes.maxCharacters10).optional(),
  address: Yup.string()
    .max(50, errorCodes.maxCharacters50)
    .required(errorCodes.required),
  postalCode: Yup.string()
    .max(5, errorCodes.maxCharacters5)
    .required(errorCodes.required),
  city: Yup.string()
    .max(50, errorCodes.maxCharacters50)
    .required(errorCodes.required),
  state: Yup.string()
    .max(50, errorCodes.maxCharacters50)
    .required(errorCodes.required),
  country: Yup.string()
    .max(50, errorCodes.maxCharacters50)
    .required(errorCodes.required),
  email: Yup.string().email(errorCodes.email).required(errorCodes.required),
});

const profileSchema = Yup.object().shape({
  gender: Yup.string().required(errorCodes.required),
  birthdate: Yup.string().required(errorCodes.required),
  isMinor: Yup.boolean().optional(),
  fatherOrGuardianName: Yup.string().required(errorCodes.required),
  nationality: Yup.string().required(errorCodes.required),
  educationalAttainment: Yup.string()
    .max(50, errorCodes.maxCharacters50)
    .required(errorCodes.required),
  studyFormat: Yup.string().required(errorCodes.required),
  hasCurp: Yup.string().optional(),
  curp: Yup.string()
    .max(18, errorCodes.maxCharacters18)
    .required(errorCodes.required),
});

const documentationMexicanSchema = Yup.object().shape({
  acta: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  curp: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  ineFront: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  ineBack: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  certificateOfStudies: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  paymentReceipt: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
});

const documentationForeignerCurpSchema = Yup.object().shape({
  dni: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  curp: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  certificateOfStudies: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  paymentReceipt: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
});

const documentationForeignerNoCurpSchema = Yup.object().shape({
  dni: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
  paymentReceipt: Yup.object().shape({
    fileName: Yup.string().required(errorCodes.required),
    file: Yup.string().required(errorCodes.required),
  }),
});

const searchSchema = Yup.object().shape({
  search: Yup.string().optional(),
});

export {
  errorCodes,
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  contactInformationSchema,
  profileSchema,
  documentationMexicanSchema,
  documentationForeignerCurpSchema,
  documentationForeignerNoCurpSchema,
  searchSchema,
};
