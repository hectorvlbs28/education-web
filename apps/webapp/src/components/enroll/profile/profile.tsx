import * as React from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import useValidateonchange from '../../../hooks/use-validateonchange/use-validateonchange';
import TextInput from '../../inputs/textinput/textinput';
import Main from '../../../components/buttons/main/main';
import RadioGroup from '../../../components/buttons/radiogroup/radiogroup';
import DateCalendar from '../../datepickers/datecalendar/datecalendar';
import NativeSelector from '../../selectors/nativeselector/nativeselector';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import CurpMessage from '../curpmessage/curpmessage';
import Typographies from '../../uikit/typographies/typographies';
import CreateContractBody from '../../../interfaces/CreateContractBody';
import CreateStudentBody from '../../../interfaces/CreateStudentBody';
import { enumsTypographies } from '../../../utils/enums';
import { profileSchema } from '../../../utils/formsValidations';
import { TEXT } from '../../../assets/globalcolors';
import { setProfile } from '../../../redux/slices/enroll';
import { isStringNotEmpty } from '../../../utils/generalFunctions';
import { formatToISO, stringToNumber } from '../../../utils/generalFunctions';
import {
  useAppDispatch,
  useProfile,
  useAppSelector,
  useUserProfile,
  useContactInformation,
} from '../../../hooks/use-redux/use-redux';

const FORMTEXT = [
  {
    label: 'Cuéntanos más sobre ti.',
    type: enumsTypographies.headline2,
  },
  {
    label:
      'Tu privacidad es nuestra prioridad. Tu información está segura con nosotros.',
    type: enumsTypographies.body1,
  },
];

type Props = {
  handleNext: () => void;
  handleCreateContract: (body: CreateContractBody) => void;
  handleSaveUserProfile: (
    body: CreateStudentBody,
    createContractBody: CreateContractBody
  ) => void;
};

const Profile = ({
  handleNext,
  handleCreateContract,
  handleSaveUserProfile,
}: Props) => {
  const dispatch = useAppDispatch();
  const profile = useProfile();
  const userProfile = useUserProfile();
  const contactInformation = useContactInformation();
  const isLogedIn = useAppSelector((state) => state.userSlice.isLogedIn);
  const studentId = useAppSelector((state) => state.userSlice.studentId);
  const isContractGenerated = useAppSelector(
    (state) => state.enrollSlice.isContractGenerated
  );
  const courseId = useAppSelector((state) => state.enrollSlice.courseId);

  const { validateOnChange, toggleValidateOnChange } = useValidateonchange();
  const { isMobile, isTablet, is768x1024, is1114x705 } = UseMediaquery();

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [containerHeight, setContainerHeight] = React.useState('85vh');
  const [disabledMinor, setDisabledMinor] = React.useState(true);
  const [displayCurp, setDisplayCurp] = React.useState(false);
  const [disabledCurp, setDisabledCurp] = React.useState(true);
  const [displayHasCurp, setDisplayHasCurp] = React.useState(false);
  const [displayCurpMessage, setDisplayCurpMessage] = React.useState(false);
  const [disableInputs, setDisableInputs] = React.useState(true);

  const fields = React.useMemo(() => {
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
    } = profile;

    return {
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
  }, [profile]);

  const userProfileFields = React.useMemo(() => {
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
    } = userProfile;

    return {
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
  }, [userProfile]);

  const initialValues = {
    gender: '',
    birthdate: '',
    isMinor: false,
    fatherOrGuardianName: 'N/A',
    nationality: '',
    educationalAttainment: '',
    studyFormat: '',
    hasCurp: 'Si',
    curp: 'N/A',
  };
  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: profileSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      dispatch(setProfile(values));
      if (isStringNotEmpty(studentId)) {
        const { name, phone } = contactInformation;
        const { birthdate, curp, educationalAttainment, studyFormat } = values;
        const createContractBody: CreateContractBody = {
          studentsNanme: name,
          schoolName: 'ifashionmx',
          dateBirthStudent: formatToISO(birthdate),
          curp: curp,
          studentPhone: phone,
          scholarship: educationalAttainment,
          startDateService: formatToISO(new Date().toISOString()),
          modality: studyFormat,
          annualRegistration: '0',
          monthlyPayments: [],
          courseId: courseId,
        };
        handleCreateContract(createContractBody);
        return;
      }
      const { name, email, phone, address, postalCode, city, state, country } =
        contactInformation;
      const {
        gender,
        birthdate,
        curp,
        educationalAttainment,
        nationality,
        isMinor,
        fatherOrGuardianName,
        studyFormat,
      } = profile;
      const createStudentBody: CreateStudentBody = {
        fullName: name,
        email,
        gender,
        birthDate: formatToISO(birthdate),
        curp,
        lastDegreeStudy: educationalAttainment,
        phone,
        address: {
          zipCode: stringToNumber(postalCode),
          city: city,
          state: state,
          country: country,
          streetName: address,
        },
        nationality,
        younger: isMinor,
        fatherFullName: fatherOrGuardianName,
        studyModality: studyFormat,
        courseId: courseId,
      };
      const createContractBody: CreateContractBody = {
        studentsNanme: name,
        schoolName: 'ifashionmx',
        dateBirthStudent: formatToISO(birthdate),
        curp: curp,
        studentPhone: phone,
        scholarship: educationalAttainment,
        startDateService: formatToISO(new Date().toISOString()),
        modality: studyFormat,
        annualRegistration: '0',
        monthlyPayments: [],
        courseId: courseId,
      };
      handleSaveUserProfile(createStudentBody, createContractBody);
    },
  });

  const handleSubmit = () => {
    if (isContractGenerated) {
      handleNext();
    } else {
      formik.handleSubmit();
    }
  };

  const handleChangeGender = (value: string) => {
    formik.setFieldValue(initialValuesKeys[0], value);
  };

  const handleChangeBirthdate = (value: string) => {
    formik.setFieldValue(initialValuesKeys[1], value);

    const currentDate = new Date();
    const [year, month, day] = value.split('-').map(Number);
    const birthdate = new Date(year, month - 1, day);

    const age = currentDate.getFullYear() - birthdate.getFullYear();
    const isMinor =
      age < 18 ||
      (age === 18 &&
        (currentDate.getMonth() < month - 1 ||
          (currentDate.getMonth() === month - 1 &&
            currentDate.getDate() < day)));

    formik.setFieldValue(initialValuesKeys[2], isMinor);
    setDisabledMinor(!isMinor);
    formik.setFieldValue(initialValuesKeys[3], isMinor ? '' : 'N/A');
  };

  const handleChangeNacionality = (value: string) => {
    formik.setFieldValue(initialValuesKeys[4], value);
    setDisplayCurp(true);
    setDisplayCurpMessage(false);

    if (value === 'Mexicana') {
      setDisabledCurp(false);
      setDisplayHasCurp(false);
      formik.setFieldValue(initialValuesKeys[7], 'Si');
      formik.setFieldValue(initialValuesKeys[8], '');
    } else {
      setDisabledCurp(false);
      setDisplayHasCurp(true);
      formik.setFieldValue(initialValuesKeys[7], 'Si');
      formik.setFieldValue(initialValuesKeys[8], '');
    }
  };

  const handleChangeHasCurp = (value: string) => {
    if (value === 'Si') {
      setDisabledCurp(false);
      setDisplayCurpMessage(false);
      formik.setFieldValue(initialValuesKeys[7], 'Si');
      formik.setFieldValue(initialValuesKeys[8], '');
    } else {
      setDisabledCurp(true);
      setDisplayCurpMessage(true);
      formik.setFieldValue(initialValuesKeys[7], 'No');
      formik.setFieldValue(initialValuesKeys[8], 'N/A');
    }
  };

  const handleChangeStudyFormat = (value: string) => {
    formik.setFieldValue(initialValuesKeys[6], value);
  };

  const handleChangeEducationalAttainment = (value: string) => {
    formik.setFieldValue(initialValuesKeys[5], value);
  };

  React.useEffect(() => {
    const shouldValidateOnChange = Object.keys(formik.errors).length > 0;
    if (shouldValidateOnChange !== validateOnChange) {
      toggleValidateOnChange();
    }
  }, [formik, toggleValidateOnChange, validateOnChange]);

  React.useEffect(() => {
    setIsDisabled(!formik.isValid || !formik.dirty);
  }, [formik]);

  React.useEffect(() => {
    if (isMobile) {
      setContainerHeight('100vh');
    } else if (isTablet || is768x1024 || is1114x705) {
      setContainerHeight('66vh');
    } else {
      setContainerHeight('85vh');
    }
  }, [isMobile, isTablet, is768x1024, is1114x705]);

  React.useEffect(() => {
    if (!fields.gender && isLogedIn) {
      setDisableInputs(true);
      Object.entries(userProfileFields).forEach(([key, value]) => {
        formik.setFieldValue(key, value);
      });

      setDisabledMinor(!userProfileFields.isMinor);
      const displayCurp = userProfileFields.curp !== 'N/A';
      setDisplayCurp(displayCurp);
      setDisabledCurp(!displayCurp);
      const displayCurpMessage = userProfileFields.hasCurp === 'No';
      setDisplayCurpMessage(displayCurpMessage);
      const displayHasCurp =
        userProfileFields.nationality !== 'Mexicana' &&
        userProfileFields.nationality !== '';
      setDisplayHasCurp(displayHasCurp);
    } else {
      setDisableInputs(false);
      Object.entries(fields).forEach(([key, value]) => {
        formik.setFieldValue(key, value);
      });

      setDisabledMinor(!fields.isMinor);
      const displayCurp = fields.curp !== 'N/A';
      setDisplayCurp(displayCurp);
      setDisabledCurp(!displayCurp);
      const displayCurpMessage = fields.hasCurp === 'No';
      setDisplayCurpMessage(displayCurpMessage);
      const displayHasCurp =
        fields.nationality !== 'Mexicana' && fields.nationality !== '';
      setDisplayHasCurp(displayHasCurp);
    }
  }, [fields, isLogedIn]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        sx={{
          width: '100%',
          minHeight: containerHeight,
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '20px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            gap: '8px',
          }}
        >
          <Box
            sx={{
              mb: 1,
              gap: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}
          >
            {FORMTEXT.map((text, index) => {
              return (
                <Typographies
                  key={index}
                  label={text.label}
                  type={text.type}
                  color={TEXT}
                />
              );
            })}
          </Box>

          <RadioGroup
            label="Sexo asignado en Acta de Nacimiento"
            isDisabled={disableInputs}
            radioOptions={['Hombre', 'Mujer']}
            handleChangeAction={handleChangeGender}
            formikName={initialValuesKeys[0]}
            formik={formik}
          />

          <DateCalendar
            label="Fecha de nacimiento"
            handleAction={handleChangeBirthdate}
            isDisabled={disableInputs}
            formikName={initialValuesKeys[1]}
            formik={formik}
          />

          <TextInput
            label="Nombre de tu tutor"
            formikName={initialValuesKeys[3]}
            formik={formik}
            placeholder="p. ej. Luis González"
            onlyNumbers={false}
            isDisabled={disabledMinor || disableInputs}
            tooltipMessage="Nombre completo de tu tutor o tutora"
          />

          <NativeSelector
            label="Nacionalidad"
            isDisabled={disableInputs}
            menuOptions={['Mexicana', 'Extranjero']}
            handleChangeAction={handleChangeNacionality}
            formikName={initialValuesKeys[4]}
            formik={formik}
            placeholder="Selecciona tu nacionalidad"
            tooltipMessage="Selecciona tu nacionalidad"
          />

          {displayHasCurp && (
            <RadioGroup
              label="¿Cuentas con CURP?"
              isDisabled={disableInputs}
              radioOptions={['Si', 'No']}
              handleChangeAction={handleChangeHasCurp}
              formikName={initialValuesKeys[7]}
              formik={formik}
            />
          )}

          {displayCurp && !displayCurpMessage && (
            <TextInput
              label="CURP"
              formikName={initialValuesKeys[8]}
              formik={formik}
              placeholder="p. ej. GOPJ901216YUT"
              onlyNumbers={false}
              isDisabled={disabledCurp || disableInputs}
              tooltipMessage="Ingresa tu CURP"
            />
          )}

          {displayCurpMessage && <CurpMessage />}

          <NativeSelector
            label="¿Cuál es tu último grado de estudios?"
            isDisabled={disableInputs}
            menuOptions={[
              'Sin estudios',
              'Primaria',
              'Secundaria',
              'Preparatoria',
              'Licenciatura',
              'Maestría',
              'Doctorado',
              'Posdoctorado',
            ]}
            handleChangeAction={handleChangeEducationalAttainment}
            formikName={initialValuesKeys[5]}
            formik={formik}
            placeholder="¿Cuál es tu último grado de estudios?"
            tooltipMessage="Selecciona tu último grado de estudios"
          />

          <RadioGroup
            label="¿En cuál modalidad te gustaría estudiar?"
            isDisabled={disableInputs}
            radioOptions={['En línea', 'Mixta']}
            handleChangeAction={handleChangeStudyFormat}
            formikName={initialValuesKeys[6]}
            formik={formik}
          />
        </Box>

        <Main
          label="Continuar"
          isDisabled={isDisabled}
          onClick={handleSubmit}
        />
      </Box>
    </form>
  );
};

export default Profile;
