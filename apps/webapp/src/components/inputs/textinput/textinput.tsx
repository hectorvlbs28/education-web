import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, TextField, InputAdornment } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import InputTooltip from '../../uikit/inputtooltip/inputtooltip';
import SvgIcons from '../../../utils/iconsEnums';
import { enumsTypographies } from '../../../utils/enums';
import { errorCodes } from '../../../utils/formsValidations';
import {
  TEXT,
  WHITE_BG,
  ERROR,
  DISABLED_GRAY,
  TEXT_DISABLED,
  SUCCESS,
  SUCCESS_SHADOW,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  formikName: string;
  formik: any;
  placeholder?: string;
  onlyNumbers?: boolean;
  isDisabled?: boolean;
  tooltipMessage?: string;
  isSearcher?: boolean;
};

const TextInput = ({
  label,
  formikName,
  formik,
  placeholder,
  onlyNumbers,
  isDisabled,
  tooltipMessage,
  isSearcher,
}: Props) => {
  const [value, setValue] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumbers) {
      const value = event.target.value;

      if (value.match(/^[0-9]*$/)) {
        setValue(value);
        formik.handleChange(event);
        setIsSuccess(true);
      }
    } else {
      setValue(event.target.value);
      formik.handleChange(event);
      setIsSuccess(true);
    }
  };

  React.useEffect(() => {
    const error = formik.errors[formikName];
    let hasError = false;
    let errorMessage = '';

    if (error) {
      hasError = true;
      switch (error) {
        case errorCodes.required:
          errorMessage = 'Campo obligatório';
          break;
        case errorCodes.email:
          errorMessage = 'Correo electrónico inválido';
          break;
        case errorCodes.maxCharacters50:
          errorMessage = 'Máximo 50 caracteres';
          break;
        case errorCodes.maxCharacters10:
          errorMessage = 'Máximo 10 caracteres';
          break;
        case errorCodes.maxCharacters5:
          errorMessage = ';Máximo 5 caracteres';
          break;
        case errorCodes.maxCharacters18:
          errorMessage = 'Máximo 18 caracteres';
          break;
      }
    }

    setHasError(hasError);
    setErrorMessage(errorMessage);
  }, [formik.errors, formikName]);

  React.useEffect(() => {
    if (isDisabled) {
      setValue('');
    }
  }, [isDisabled]);

  React.useEffect(() => {
    const fieldValue = formik.values[formikName];

    if (fieldValue !== '' && fieldValue !== 'N/A') {
      setValue(fieldValue);
      setIsSuccess(true);
    } else {
      setValue('');
      setIsSuccess(false);
    }
  }, [formik.values, formikName]);

  return (
    <Box
      sx={{
        padding: 0,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 1,
        marginTop: '10px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          gap: 1,
        }}
      >
        <Typographies
          type={enumsTypographies.body2}
          label={label}
          color={isDisabled ? TEXT_DISABLED : TEXT}
        />

        {tooltipMessage && <InputTooltip text={tooltipMessage} />}
      </Box>

      <TextField
        value={value}
        name={formikName}
        onChange={handleChange}
        error={hasError}
        placeholder={placeholder}
        disabled={isDisabled}
        margin="none"
        variant="outlined"
        fullWidth
        InputProps={{
          endAdornment: hasError ? (
            <InputAdornment position="end">
              <ErrorIcon
                sx={{
                  color: ERROR,
                  fontSize: '20px',
                }}
              />
            </InputAdornment>
          ) : isSuccess ? (
            <InputAdornment position="end">
              <CheckCircleIcon
                sx={{
                  color: SUCCESS,
                  fontSize: '20px',
                }}
              />
            </InputAdornment>
          ) : null,
          startAdornment: isSearcher ? (
            <InputAdornment position="start">
              <img
                src={SvgIcons.MagnifyingGlass}
                alt="search"
                style={{ width: '20px', height: '20px' }}
              />
            </InputAdornment>
          ) : null,
        }}
        sx={{
          backgroundColor: isDisabled ? DISABLED_GRAY : WHITE_BG,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: isSuccess && !hasError ? SUCCESS : '',
              boxShadow:
                isSuccess && !hasError
                  ? `0px 0px 0px 2px ${SUCCESS_SHADOW}`
                  : '',
            },
            '&:hover fieldset': {
              borderColor: isSuccess && !hasError ? SUCCESS : '',
            },
            '&.Mui-focused fieldset': {
              borderColor: isSuccess && !hasError ? SUCCESS : '',
            },
          },
        }}
      />

      <Typographies
        type={enumsTypographies.body5}
        label={errorMessage}
        color={ERROR}
      />
    </Box>
  );
};

export default TextInput;
