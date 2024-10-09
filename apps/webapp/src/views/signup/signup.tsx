import * as React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useFormik } from 'formik';
import { Box, Container } from '@mui/material';
import TextInput from '../../components/inputs/textinput/textinput';
import PaswordInput from '../../components/inputs/paswordinput/paswordinput';
import Paths from '../../utils/paths';
import Main from '../../components/buttons/main/main';
import PassConditions from '../../components/signup/passconditions/passconditions';
import Navigate from '../../components/buttons/navigate/navigate';
import apiService from '../../services/api';
import Typographies from '../../components/uikit/typographies/typographies';
import { enumsTypographies } from '../../utils/enums';
import { Users } from '../../services/apis';
import { useAppDispatch } from '../../hooks/use-redux/use-redux';
import { setBackdrop, setShowToast } from '../../redux/slices/navigation';
import { signUpSchema, errorCodes } from '../../utils/formsValidations';
import {
  TEXT,
  TEXT_GRAY,
  RADIO_SELECTED,
  ICON_RED,
} from '../../assets/globalcolors';

const FORMTEXT = [
  {
    label: 'Crea una cuenta',
    type: enumsTypographies.headline1,
  },
  {
    label: 'Regístrate y completa tu inscripción en iFashionMx.',
    type: enumsTypographies.body1,
  },
];

const SignUp = () => {
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [displayPassConditions, setDisplayPassConditions] =
    React.useState(false);

  const initialValues = {
    email: '',
    name: '',
    password: '',
  };
  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: async (values) => {
      dispatch(setBackdrop(true));
      try {
        await apiService.post(Users.signup, values);
        dispatch(setBackdrop(false));
        dispatch(
          setShowToast({
            showToast: true,
            toastMessage: 'Tu usuario ha sido creado exitosamente',
            toastIcon: <CheckCircleIcon sx={{ color: RADIO_SELECTED }} />,
          })
        );
        formik.resetForm();
      } catch (error: any) {
        dispatch(setBackdrop(false));
        let toastMessage =
          'Ocurrió un error al guardar tu registro. Por favor, intenta de nuevo.';
        if (
          error.response &&
          error.response.data.error === 'users.user_already_exists'
        ) {
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
      }
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  React.useEffect(() => {
    setIsDisabled(!formik.isValid || !formik.dirty);
  }, [formik]);

  React.useEffect(() => {
    const password = formik.values.password;
    const hasPassword = password.length > 0;
    setDisplayPassConditions(hasPassword);
  }, [formik.values.password]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        padding: 6,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {FORMTEXT.map((text, index) => {
          return (
            <Typographies key={index} label={text.label} type={text.type} />
          );
        })}
      </Box>

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

        <TextInput
          label="Nombre completo"
          formikName={initialValuesKeys[1]}
          formik={formik}
          placeholder="p. ej. Juan González"
          onlyNumbers={false}
          isDisabled={false}
          tooltipMessage="Ingresa tu nombre completo"
        />

        <PaswordInput
          label="Contraseña"
          formikName={Object.keys(initialValues)[2]}
          formik={formik}
          tooltipMessage="Ingresa tu contraseña"
        />

        {displayPassConditions && (
          <PassConditions
            formikError={formik.errors.password}
            errorCodes={errorCodes}
          />
        )}

        {!displayPassConditions && (
          <Typographies
            label="Debe contener al menos 8 caracteres, y contener letras y números"
            type={enumsTypographies.body1}
            color={TEXT_GRAY}
          />
        )}

        <Main
          label="Continuar"
          isDisabled={isDisabled}
          onClick={handleSubmit}
        />

        <Box
          sx={{
            mt: 1,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
          }}
        >
          <Typographies
            label="  ¿Ya tienes una cuenta?"
            type={enumsTypographies.body1}
            color={TEXT}
          />

          <Navigate text="Inicia sesión" path={Paths.Login} />
        </Box>
      </form>
    </Container>
  );
};

export default SignUp;
