import React from 'react';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import useValidateonchange from '../../../hooks/use-validateonchange/use-validateonchange';
import TextInput from '../../inputs/textinput/textinput';
import Main from '../../../components/buttons/main/main';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { contactInformationSchema } from '../../../utils/formsValidations';
import { TEXT } from '../../../assets/globalcolors';
import { setContactInformation } from '../../../redux/slices/enroll';
import {
  useAppSelector,
  useAppDispatch,
  useContactInformation,
  useUserContactInformation,
} from '../../../hooks/use-redux/use-redux';

type Props = {
  handleNext: () => void;
};

const ContactInformation = ({ handleNext }: Props) => {
  const dispatch = useAppDispatch();
  const { validateOnChange, toggleValidateOnChange } = useValidateonchange();
  const { isMobile, isTablet, is768x1024, is1114x705 } = UseMediaquery();
  const userName = useAppSelector((state) => state.userSlice.userName);
  const isLogedIn = useAppSelector((state) => state.userSlice.isLogedIn);
  const isContractGenerated = useAppSelector(
    (state) => state.enrollSlice.isContractGenerated
  );

  const contactInformation = useContactInformation();
  const userContactInformation = useUserContactInformation();

  const [isDisabled, setIsDisabled] = React.useState(true);
  const [containerHeight, setContainerHeight] = React.useState('85vh');
  const [disableInputs, setDisableInputs] = React.useState(true);

  const fields = React.useMemo(() => {
    const { name, phone, address, postalCode, city, state, country, email } =
      contactInformation;
    return {
      name,
      phone,
      address,
      postalCode,
      city,
      state,
      country,
      email,
    };
  }, [contactInformation]);

  const userFields = React.useMemo(() => {
    const { name, phone, address, postalCode, city, state, country, email } =
      userContactInformation;
    return {
      name,
      phone,
      address,
      postalCode,
      city,
      state,
      country,
      email,
    };
  }, [userContactInformation]);

  const FORMTEXT = [
    {
      label: `👋 ¡Hola ${userName}`,
      type: enumsTypographies.headline2,
    },
    {
      label: 'Ingresa tus datos de contacto para seguir con tu inscripción.',
      type: enumsTypographies.body1,
    },
  ];

  const initialValues = {
    name: '',
    phone: '',
    address: '',
    postalCode: '',
    city: '',
    state: '',
    country: '',
    email: '',
  };

  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: contactInformationSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      dispatch(setContactInformation(values));
      handleNext();
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
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
    if (userFields.phone !== '' && isLogedIn) {
      setDisableInputs(true);
      Object.entries(userFields).forEach(([key, value]) => {
        formik.setFieldValue(key, value || '');
      });
    } else {
      setDisableInputs(false);

      if (fields.phone === '') {
        Object.entries(userFields).forEach(([key, value]) => {
          formik.setFieldValue(key, value || '');
        });
      } else {
        Object.entries(fields).forEach(([key, value]) => {
          formik.setFieldValue(key, value || '');
        });
      }
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
            gap: '5px',
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

          <TextInput
            label="Nombre completo"
            formikName={initialValuesKeys[0]}
            formik={formik}
            placeholder="p. ej. Juan González"
            onlyNumbers={false}
            isDisabled={disableInputs}
            tooltipMessage="Ingresa tu nombre completo"
          />

          <TextInput
            label="Correo electrónico"
            formikName={initialValuesKeys[7]}
            formik={formik}
            placeholder="p. ej. juan@mail.com"
            onlyNumbers={false}
            //isDisabled={isContractGenerated}
            isDisabled={disableInputs}
            tooltipMessage="Ingresa tu correo electrónico"
          />

          <TextInput
            label="Teléfono celular con whatsapp"
            formikName={initialValuesKeys[1]}
            formik={formik}
            placeholder="p. ej. 55 3232 5504"
            onlyNumbers={true}
            //isDisabled={isContractGenerated}
            isDisabled={disableInputs}
            tooltipMessage="Ingresa tu teléfono celular"
          />

          <TextInput
            label="Domicilio"
            formikName={initialValuesKeys[2]}
            formik={formik}
            placeholder="Calle, número ext e int"
            onlyNumbers={false}
            //isDisabled={isContractGenerated}
            isDisabled={disableInputs}
            tooltipMessage="Ingresa tu domicilio"
          />

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                width: '48%',
              }}
            >
              <TextInput
                label="Código postal"
                formikName={initialValuesKeys[3]}
                formik={formik}
                placeholder="p. ej. 01000"
                onlyNumbers={true}
                //isDisabled={isContractGenerated}
                isDisabled={disableInputs}
                tooltipMessage="Ingresa tu código postal"
              />
            </Box>

            <Box
              sx={{
                width: '48%',
              }}
            >
              <TextInput
                label="Ciudad"
                formikName={initialValuesKeys[4]}
                formik={formik}
                placeholder="p. ej. Benito Juaréz"
                onlyNumbers={false}
                //isDisabled={isContractGenerated}
                isDisabled={disableInputs}
                tooltipMessage="Ingresa tu ciudad"
              />
            </Box>
          </Box>

          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                width: '48%',
              }}
            >
              <TextInput
                label="Estado"
                formikName={initialValuesKeys[5]}
                formik={formik}
                placeholder="p. ej. Ciudad de México"
                onlyNumbers={false}
                //isDisabled={isContractGenerated}
                isDisabled={disableInputs}
                tooltipMessage="Ingresa tu estado"
              />
            </Box>

            <Box
              sx={{
                width: '48%',
              }}
            >
              <TextInput
                label="País"
                formikName={initialValuesKeys[6]}
                formik={formik}
                placeholder="p. ej. México"
                onlyNumbers={false}
                //isDisabled={isContractGenerated}
                isDisabled={disableInputs}
                tooltipMessage="Ingresa tu país"
              />
            </Box>
          </Box>
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

export default ContactInformation;
