import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Typography } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { ICON_RED, ICON_GREEN } from '../../../assets/globalcolors';

type LabelsProps = {
  label: string;
  errors: string[];
  errorCode: string;
};

const Labels = ({ label, errors, errorCode }: LabelsProps) => {
  const [hasError, setHasError] = React.useState(true);

  React.useEffect(() => {
    setHasError(errors.includes(errorCode));
  }, [errors, errorCode]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {hasError && (
        <HighlightOffIcon
          sx={{ color: ICON_RED, width: '22px', height: '22px' }}
        />
      )}

      {!hasError && (
        <CheckIcon sx={{ color: ICON_GREEN, width: '22px', height: '22px' }} />
      )}

      <Typographies
        label={label}
        type={enumsTypographies.body3}
        color={hasError ? ICON_RED : ICON_GREEN}
      />
    </Box>
  );
};

type Props = {
  formikError: any;
  errorCodes: any;
};

const PassConditions = ({ formikError, errorCodes }: Props) => {
  const [errors, setErrors] = React.useState([]);

  React.useEffect(() => {
    if (formikError !== undefined) {
      const errorsArray = formikError.split('\n');
      setErrors(errorsArray);
    } else {
      setErrors([]);
    }
  }, [formikError]);

  return (
    <Box
      sx={{
        mb: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '4px',
      }}
    >
      <Labels
        label="Mínimo 8 caracteres"
        errors={errors}
        errorCode={errorCodes.minCharacters8}
      />

      <Labels
        label="1 letra mayúscula (A-Z)"
        errors={errors}
        errorCode={errorCodes.mustHaveOneUppercase}
      />

      <Labels
        label="1 letra minúscula (a-z)"
        errors={errors}
        errorCode={errorCodes.mustHaveOneLowercase}
      />

      <Labels
        label="1 número (0-9)"
        errors={errors}
        errorCode={errorCodes.mustHaveOneNumber}
      />

      <Labels
        label="1 caracter especial (p. ej. !@#$%&*)"
        errors={errors}
        errorCode={errorCodes.mustHaveOneSpecialCharacter}
      />
    </Box>
  );
};

export default PassConditions;
