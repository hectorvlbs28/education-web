import * as React from 'react';
import { useFormik } from 'formik';
import { Box, Container } from '@mui/material';
import TextInput from '../../components/inputs/textinput/textinput';
import Navigate from '../../components/buttons/navigate/navigate';
import Paths from '../../utils/paths';
import Main from '../../components/buttons/main/main';
import Typographies from '../../components/uikit/typographies/typographies';
import { enumsTypographies } from '../../utils/enums';
import { forgotPasswordSchema } from '../../utils/formsValidations';

const ForgotPassword = () => {
  const NAVS = [
    {
      id: 1,
      text: '¿Ya tienes una cuenta? Inicia sesión',
      path: Paths.Login,
    },
    {
      id: 2,
      text: '¿No tienes una cuenta? Regístrate',
      path: Paths.SignUp,
    },
  ];

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [validateOnChange, setValidateOnChange] = React.useState(false);

  const initialValues = {
    email: '',
  };
  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: forgotPasswordSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
      <Typographies
        label="Recuperar contraseña"
        type={enumsTypographies.headline1}
      />

      <Box
        sx={{
          mt: 1,
          width: '100%',
        }}
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <TextInput
            label="Correo electrónico"
            formikName={initialValuesKeys[0]}
            formik={formik}
            placeholder="p. ej. juan.gonzalez@empresa.com"
            onlyNumbers={false}
            isDisabled={false}
            tooltipMessage="Ingresa tu correo electrónico"
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
};

export default ForgotPassword;
