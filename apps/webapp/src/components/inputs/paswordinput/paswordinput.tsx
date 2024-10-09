import * as React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  IconButton,
  OutlinedInput,
  Box,
  InputAdornment,
  FormControl,
} from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import InputTooltip from '../../uikit/inputtooltip/inputtooltip';
import { enumsTypographies } from '../../../utils/enums';
import { errorCodes } from '../../../utils/formsValidations';
import {
  TEXT,
  ICON_GRAY,
  TEXT_DISABLED,
  ERROR,
  SUCCESS,
  SUCCESS_SHADOW,
  WHITE_BG,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  formikName: string;
  formik: any;
  tooltipMessage?: string;
};

const PaswordInput = ({ label, formikName, formik, tooltipMessage }: Props) => {
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showStartAdornment, setShowStartAdornment] = React.useState(true);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    formik.handleChange(event);
    setIsSuccess(true);
  };

  const handleInputClick = () => {
    setShowStartAdornment(false);
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
      }
    }

    setHasError(hasError);
    setErrorMessage(errorMessage);
  }, [formik.errors, formikName]);

  React.useEffect(() => {
    const fieldValue = formik.values[formikName];

    if (fieldValue !== '' && fieldValue !== 'N/A') {
      setPassword(fieldValue);
      setShowStartAdornment(false);
    } else {
      setPassword('');
      setShowStartAdornment(true);
    }
  }, [formik.values, formikName]);

  React.useEffect(() => {
    if (password === '') {
      setShowStartAdornment(true);
    }
  }, [password]);

  return (
    <FormControl
      error={hasError}
      variant="outlined"
      margin="normal"
      fullWidth
      sx={{
        gap: 1,
        marginTop: '10px',
        padding: 0,

        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: isSuccess && !hasError ? SUCCESS : '',
            boxShadow:
              isSuccess && !hasError ? `0px 0px 0px 2px ${SUCCESS_SHADOW}` : '',
          },
          '&:hover fieldset': {
            borderColor: isSuccess && !hasError ? SUCCESS : '',
          },
          '&.Mui-focused fieldset': {
            borderColor: isSuccess && !hasError ? SUCCESS : '',
          },
        },
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
          color={TEXT}
        />

        {tooltipMessage && <InputTooltip text={tooltipMessage} />}
      </Box>

      <OutlinedInput
        name={formikName}
        value={password}
        type={showPassword ? 'text' : 'password'}
        onChange={handleChange}
        onClick={handleInputClick}
        size="small"
        startAdornment={
          showStartAdornment && password.length === 0 ? (
            <InputAdornment position="start">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => {
                return (
                  <FiberManualRecordIcon
                    key={index}
                    sx={{
                      color: TEXT_DISABLED,
                      width: '0.5rem',
                      height: '0.5rem',
                    }}
                  />
                );
              })}
            </InputAdornment>
          ) : null
        }
        endAdornment={
          <InputAdornment position="end">
            {hasError ? (
              <ErrorIcon
                sx={{
                  color: ERROR,
                  fontSize: '20px',
                }}
              />
            ) : isSuccess ? (
              <CheckCircleIcon
                sx={{
                  color: SUCCESS,
                  fontSize: '20px',
                }}
              />
            ) : null}

            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityOff
                  sx={{
                    color: ICON_GRAY,
                  }}
                />
              ) : (
                <Visibility
                  sx={{
                    color: ICON_GRAY,
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
        sx={{
          backgroundColor: WHITE_BG,
        }}
      />

      <Typographies
        type={enumsTypographies.body5}
        label={errorMessage}
        color={ERROR}
      />
    </FormControl>
  );
};

export default PaswordInput;
