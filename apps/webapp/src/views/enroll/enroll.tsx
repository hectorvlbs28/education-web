import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useNavigate } from 'react-router-dom';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import ContactInformation from '../../components/enroll/contactinformation/contactinformation';
import Profile from '../../components/enroll/profile/profile';
import SignContract from '../../components/enroll/signcontract/signcontract';
import Payment from '../../components/enroll/payment/payment';
import Documentation from '../../components/enroll/documentation/documentation';
import UseMediaquery from '../../hooks/use-mediaquery/use-mediaquery';
import apiService from '../../services/api';
import Paths from '../../utils/paths';
import Typographies from '../../components/uikit/typographies/typographies';
import StudentResponse from '../../interfaces/studentresponse';
import CreateContractResponse from '../../interfaces/createContractResponse';
import GetContractUrlResponse from '../../interfaces/getContractUrlResponse';
import ConsultContract from '../../interfaces/ConsultContract';
import UploadingDocuments from '../../components/documentation/uploadingdocuments/uploadingdocuments';
import CreateContractBody from '../../interfaces/CreateContractBody';
import CreateStudentBody from '../../interfaces/CreateStudentBody';
import SvgIcons from '../../utils/iconsEnums';
import MeResponse from '../../interfaces/meresponse';
import SendPaymentBody from '../../interfaces/SendPaymentBody';
import SendPaymentResponse from '../../interfaces/SendPaymentResponse';
import { enumsTypographies } from '../../utils/enums';
import { numberToString, formatCourses } from '../../utils/generalFunctions';
import { setUserProfile, setUserCourses } from '../../redux/slices/user';
import { Students, Users, Payments } from '../../services/apis';
import {
  resetAll,
  setContractGenerated,
  setContractId,
} from '../../redux/slices/enroll';
import {
  setBackdrop,
  setShowToast,
  setActiveStep,
} from '../../redux/slices/navigation';
import {
  useAppDispatch,
  useAppSelector,
  useUserEnrollCourses,
} from '../../hooks/use-redux/use-redux';
import {
  MAIN_VIOLET,
  STROKE_GREY,
  RADIO_SELECTED,
  ICON_RED,
} from '../../assets/globalcolors';

const QontoStepIcon = (props: StepIconProps) => {
  const { active, completed } = props;

  return (
    <Box
      sx={{
        width: 'auto',
        height: 'auto',
        backgroundColor: 'transparent',
      }}
    >
      {active ? (
        <img
          src={SvgIcons.ActiveStep}
          alt="ActiveStep"
          style={{
            width: 20,
            height: 20,
          }}
        />
      ) : completed ? (
        <img
          src={SvgIcons.DoneStep}
          alt="DoneStep"
          style={{
            width: 20,
            height: 20,
          }}
        />
      ) : (
        <img
          src={SvgIcons.InactiveStep}
          alt="InactiveStep"
          style={{
            width: 20,
            height: 20,
          }}
        />
      )}
    </Box>
  );
};

const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: MAIN_VIOLET,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: MAIN_VIOLET,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: STROKE_GREY,
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const Enroll = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isMobile, isTablet, is768x1024, is1114x705 } = UseMediaquery();
  const activeStep = useAppSelector(
    (state) => state.navigationSlice.activeStep
  );
  const studentId = useAppSelector((state) => state.userSlice.studentId);
  const isContractGenerated = useAppSelector(
    (state) => state.enrollSlice.isContractGenerated
  );
  const contractId = useAppSelector((state) => state.enrollSlice.contractId);
  const nationality = useAppSelector(
    (state) => state.enrollSlice.profile.nationality
  );
  const hasCurp = useAppSelector((state) => state.enrollSlice.profile.hasCurp);
  const courseId = useAppSelector((state) => state.enrollSlice.courseId);
  const userEnrollCourses = useUserEnrollCourses();

  const [containerStepWidth, setContainerStepWidth] = React.useState('500px');
  const [containerStepPadding, setContainerStepPadding] = React.useState('0');
  const [allStepsCompleted, setAllStepsCompleted] = React.useState(false);
  const [loadingContract, setLoadingContract] = React.useState(true);
  const [formType, setFormType] = React.useState('mexican');
  const [loadingDocumentations, setLoadingDocumentations] =
    React.useState(false);

  const steps = [
    'Datos de contacto',
    'Tu perfil',
    'Firmar contrato',
    'Realizar pago',
    'Documentación',
  ];

  const handleNextStep = () => {
    setAllStepsCompleted(false);
    dispatch(setActiveStep(activeStep + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveUserProfile = async (
    body: CreateStudentBody,
    createContractBody: CreateContractBody
  ): Promise<void> => {
    dispatch(setBackdrop(true));
    try {
      const studentResponse = (await apiService.post(
        Students.student,
        body
      )) as StudentResponse;

      dispatch(
        setUserProfile({
          email: studentResponse.data.email,
          address: studentResponse.data.addresses[0].streetName,
          birthdate: studentResponse.data.birthDate,
          curp: studentResponse.data.curp,
          fatherOrGuardianName: studentResponse.data.fatherFullName,
          userName: studentResponse.data.fullName,
          gender: studentResponse.data.gender,
          educationalAttainment: studentResponse.data.lastDegreeStudy,
          nationality: studentResponse.data.nationality,
          phone: studentResponse.data.phone,
          studyFormat: studentResponse.data.studyModality,
          isMinor: studentResponse.data.younger,
          studentId: studentResponse.data.id,
          postalCode: numberToString(studentResponse.data.addresses[0].zipCode),
          city: studentResponse.data.addresses[0].city,
          state: studentResponse.data.addresses[0].state,
          country: studentResponse.data.addresses[0].country,
        })
      );
      dispatch(setBackdrop(false));
      dispatch(
        setShowToast({
          showToast: true,
          toastMessage: 'Perfil guardado exitosamente',
          toastIcon: <CheckCircleIcon sx={{ color: RADIO_SELECTED }} />,
        })
      );

      handleCreateContract(createContractBody, studentResponse.data.id);
      //handleNextStep();
    } catch (error: any) {
      dispatch(setBackdrop(false));
      if (error.response) {
        if (error.response.data.error === 'student-already-exists') {
          dispatch(
            setShowToast({
              showToast: true,
              toastMessage:
                'Ya existe un registro con estos datos. Por favor, intenta de nuevo.',
              toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
            })
          );
        } else {
          setShowToast({
            showToast: true,
            toastMessage:
              'Ocurrió un error al guardar tu registro. Por favor, intenta de nuevo.',
            toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
          });
        }
      } else {
        setShowToast({
          showToast: true,
          toastMessage:
            'Ocurrió un error al guardar tu registro. Por favor, intenta de nuevo.',
          toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
        });
      }
    }
  };

  const handleCreateContract = async (
    body: CreateContractBody,
    localStudentId?: string
  ): Promise<void> => {
    handleNextStep();

    if (isContractGenerated === false) {
      try {
        const createContractResponse = (await apiService.post(
          Students.createContract(localStudentId || studentId),
          body
        )) as CreateContractResponse;
        const contractId = createContractResponse.data.id;
        (await apiService.get(
          Students.getContractUrl(localStudentId || studentId, contractId)
        )) as GetContractUrlResponse;
        dispatch(
          setContractGenerated({
            isContractGenerated: true,
          })
        );
        dispatch(setContractId({ contractId: contractId }));

        const meResponse = (await apiService.get(Users.me)) as MeResponse;
        const courses = meResponse.data.students[0]?.courses || [];
        dispatch(setUserCourses({ courses: formatCourses(courses) }));

        setLoadingContract(false);
      } catch (error: any) {
        setShowToast({
          showToast: true,
          toastMessage:
            'Ocurrió un error al generar tu contrato. Por favor, intenta de nuevo.',
          toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
        });
      }
    }
  };

  const handleValidateContract = async (): Promise<void> => {
    dispatch(setBackdrop(true));
    try {
      const consultContract = (await apiService.get(
        Students.consultContract(contractId)
      )) as ConsultContract;
      const signature = consultContract.data.signature;

      dispatch(setBackdrop(false));

      if (signature === true) {
        const meResponse = (await apiService.get(Users.me)) as MeResponse;
        const courses = meResponse.data.students[0]?.courses || [];
        dispatch(setUserCourses({ courses: formatCourses(courses) }));

        handleNextStep();
      } else {
        dispatch(
          setShowToast({
            showToast: true,
            toastMessage:
              'Tu contrato aún no ha sido firmado. Por favor, intenta de nuevo.',
            toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
          })
        );
      }
    } catch (error: any) {
      dispatch(setBackdrop(false));
      setShowToast({
        showToast: true,
        toastMessage:
          'Ocurrió un error al consultar tu contrato. Por favor, intenta de nuevo.',
        toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
      });
    }
  };

  const handleSaveStudentDocumentations = async (
    formData: FormData
  ): Promise<void> => {
    handleNextStep();
    setAllStepsCompleted(true);
    setLoadingDocumentations(true);

    try {
      await apiService.postFile(
        Students.uploadStudentDocument(studentId),
        formData
      );
      setLoadingDocumentations(false);
    } catch (error) {
      setLoadingDocumentations(false);
      setActiveStep(activeStep - 1);
      setShowToast({
        showToast: true,
        toastMessage:
          'Ocurrió un error al subir tu documentación. Por favor, intenta de nuevo.',
        toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
      });
    }
  };

  const handleSendPayment = async (
    sendPaymentBody: SendPaymentBody
  ): Promise<void> => {
    dispatch(setBackdrop(true));

    try {
      const sendPaymentResponse = (await apiService.post(
        Payments.send,
        sendPaymentBody
      )) as SendPaymentResponse;

      window.open(sendPaymentResponse.data, '_self');
    } catch (error) {
      dispatch(setBackdrop(false));
      setShowToast({
        showToast: true,
        toastMessage:
          'Ocurrió un al procesar tu pago. Por favor, intenta de nuevo.',
        toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
      });
    }
  };

  const handleFinish = () => {
    dispatch(resetAll());
    dispatch(setActiveStep(0));
    navigate(Paths.Home);
  };

  React.useEffect(() => {
    if (isMobile) {
      setContainerStepWidth('100%');
      setContainerStepPadding('5rem');
    } else if (isTablet || is768x1024 || is1114x705) {
      setContainerStepWidth('90%');
      setContainerStepPadding('5rem');
    } else {
      setContainerStepWidth('500px');
      setContainerStepPadding('0');
    }
  }, [isMobile, isTablet, is768x1024, is1114x705]);

  React.useEffect(() => {
    if (isContractGenerated) {
      setLoadingContract(false);
    }
  }, [isContractGenerated]);

  React.useEffect(() => {
    if (nationality === 'Mexicana') {
      setFormType('mexican');
    } else {
      if (hasCurp === 'Si') {
        setFormType('foreignerCurp');
      } else {
        setFormType('foreignerNoCurp');
      }
    }
  }, [nationality, hasCurp]);

  React.useEffect(() => {
    if (userEnrollCourses.courses.length > 0) {
      const course = userEnrollCourses.courses.find(
        (course) => course.courseId === courseId
      );
      if (course) {
        dispatch(
          setContractGenerated({
            isContractGenerated: true,
          })
        );
        dispatch(setContractId({ contractId: course.contract.contractId }));
      }
    }
  }, [courseId, userEnrollCourses]);

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<QontoConnector />}
          sx={{
            width: '100%',
          }}
        >
          {steps.map((label) => {
            const stepProps: { completed?: boolean } = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel StepIconComponent={QontoStepIcon}>
                  <Typographies
                    label={label}
                    type={enumsTypographies.body4}
                    color={MAIN_VIOLET}
                    align="center"
                    extraStyles={{
                      mt: '-1rem',
                    }}
                  />
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Box
          sx={{
            width: containerStepWidth,
            paddingBottom: containerStepPadding,
            mt: 2,
          }}
        >
          {activeStep === 0 && (
            <ContactInformation handleNext={handleNextStep} />
          )}
          {activeStep === 1 && (
            <Profile
              handleNext={handleNextStep}
              handleCreateContract={handleCreateContract}
              handleSaveUserProfile={handleSaveUserProfile}
            />
          )}
          {activeStep === 2 && (
            <SignContract
              loadingContract={loadingContract}
              handleValidateContract={handleValidateContract}
            />
          )}
          {activeStep === 3 && (
            <Payment
              handleNext={handleNextStep}
              handleSendPayment={handleSendPayment}
            />
          )}
          {activeStep === 4 && (
            <Documentation
              formType={formType}
              handleSaveStudentDocumentations={handleSaveStudentDocumentations}
            />
          )}

          {allStepsCompleted ? (
            <UploadingDocuments
              Done={SvgIcons.Done}
              handleClick={handleFinish}
              loadingDocumentations={loadingDocumentations}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Enroll;
