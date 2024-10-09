import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import TextInput from '../../components/inputs/textinput/textinput';
import PaswordInput from '../../components/inputs/paswordinput/paswordinput';
import Paths from '../../utils/paths';
import Navigate from '../../components/buttons/navigate/navigate';
import Main from '../../components/buttons/main/main';
import apiService from '../../services/api';
import LoginResponse from '../../interfaces/loginresponse';
import MeResponse from '../../interfaces/meresponse';
import Typographies from '../../components/uikit/typographies/typographies';
import { formatCourses } from '../../utils/generalFunctions';
import { enumsTypographies } from '../../utils/enums';
import { Auth, Users } from '../../services/apis';
import { useAppDispatch } from '../../hooks/use-redux/use-redux';
import { loginSchema } from '../../utils/formsValidations';
import { setUser, setUserCourses } from '../../redux/slices/user';
import { setBackdrop, setShowToast } from '../../redux/slices/navigation';
import { RADIO_SELECTED, ICON_RED } from '../../assets/globalcolors';

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [validateOnChange, setValidateOnChange] = React.useState(false);
  const from = location.state?.from?.pathname || '/';

  const NAVS = [
    {
      id: 1,
      text: '¿Olvidaste tu contraseña?',
      path: Paths.ForgotPassword,
    },
    {
      id: 2,
      text: '¿No tienes una cuenta? Regístrate',
      path: Paths.SignUp,
    },
  ];

  const initialValues = {
    email: '',
    password: '',
  };
  const initialValuesKeys = Object.keys(initialValues);

  const mapUserData = (response: LoginResponse, meResponse: MeResponse) => ({
    userId: response.data.userId,
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
    email: meResponse.data.email,
    address: meResponse.data.students[0]?.addresses[0]?.streetName || '',
    birthdate: meResponse.data.students[0]?.birthDate || '',
    curp: meResponse.data.students[0]?.curp || '',
    fatherOrGuardianName: meResponse.data.students[0]?.fatherFullName || '',
    userName: meResponse.data.name,
    gender: meResponse.data.students[0]?.gender || '',
    educationalAttainment: meResponse.data.students[0]?.lastDegreeStudy || '',
    nationality: meResponse.data.students[0]?.nationality || '',
    phone: meResponse.data.students[0]?.phone || '',
    studyFormat: meResponse.data.students[0]?.studyModality || '',
    isMinor: meResponse.data.students[0]?.younger || false,
    studentId: meResponse.data.students[0]?.id || '',
    postalCode: meResponse.data.students[0]?.addresses[0]?.zipCode || '',
    city: meResponse.data.students[0]?.addresses[0]?.city || '',
    state: meResponse.data.students[0]?.addresses[0]?.state || '',
    country: meResponse.data.students[0]?.addresses[0]?.country || '',
  });

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: async (values) => {
      dispatch(setBackdrop(true));
      try {
        const response = (await apiService.post(
          Auth.login,
          values
        )) as LoginResponse;
        localStorage.setItem('accessToken', response.data.accessToken);

        const meResponse = (await apiService.get(Users.me)) as MeResponse;

        dispatch(setUser(mapUserData(response, meResponse)));

        const courses = meResponse.data.students[0]?.courses || [];
        dispatch(setUserCourses({ courses: formatCourses(courses) }));

        dispatch(
          setShowToast({
            showToast: true,
            toastMessage: '¡Bienvenido!',
            toastIcon: <CheckCircleIcon sx={{ color: RADIO_SELECTED }} />,
          })
        );

        dispatch(setBackdrop(false));

        navigate(from, { replace: true });
      } catch (error: any) {
        console.log('error', error);
        let toastMessage =
          'Ocurrió un error al iniciar sesión. Por favor, intenta de nuevo.';
        if (error.response?.data.error === 'users.user_already_exists') {
          toastMessage =
            'El correo electrónico ya está registrado. Por favor, intenta de nuevo.';
        }
        dispatch(
          setShowToast({
            showToast: true,
            toastMessage,
            toastIcon: <ErrorIcon sx={{ color: ICON_RED }} />,
          })
        );

        dispatch(setBackdrop(false));
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  React.useEffect(() => {
    const shouldValidateOnChange = Object.keys(formik.errors).length > 0;
    setValidateOnChange(shouldValidateOnChange);
  }, [formik]);

  React.useEffect(() => {
    setIsDisabled(!formik.isValid || !formik.dirty);
  }, [formik]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typographies label="Iniciar sesión" type={enumsTypographies.headline1} />

      <Box
        sx={{
          mt: 1,
          width: '100%',
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label="Correo electrónico"
            formikName={initialValuesKeys[0]}
            formik={formik}
            placeholder="p. ej. juan.gonzalez@empresa.com"
            onlyNumbers={false}
            isDisabled={false}
            tooltipMessage="Ingresa tu correo electrónico"
          />

          <PaswordInput
            label="Contraseña"
            formikName={Object.keys(initialValues)[1]}
            formik={formik}
            tooltipMessage="Ingresa tu contraseña"
          />

          <Main
            label="Continuar"
            isDisabled={isDisabled}
            onClick={handleSubmit}
          />
        </form>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {NAVS.map((nav) => (
            <Navigate key={nav.id} text={nav.text} path={nav.path} />
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
