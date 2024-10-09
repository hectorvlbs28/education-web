import * as React from 'react';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, MenuItem, Box } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import InputTooltip from '../../uikit/inputtooltip/inputtooltip';
import { enumsTypographies } from '../../../utils/enums';
import { errorCodes } from '../../../utils/formsValidations';
import {
  TEXT,
  TEXT_DISABLED,
  WHITE_BG,
  ERROR,
  SUCCESS,
  SUCCESS_SHADOW,
  DISABLED_GRAY,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  isDisabled?: boolean;
  menuOptions: string[];
  handleChangeAction: (value: string) => void;
  formikName: string;
  formik: any;
  placeholder?: string;
  tooltipMessage?: string;
};

const NativeSelector = ({
  label,
  isDisabled,
  menuOptions,
  handleChangeAction,
  formikName,
  formik,
  placeholder,
  tooltipMessage,
}: Props) => {
  const [value, setValue] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    handleChangeAction(event.target.value);
    setIsSuccess(true);
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
    setIsSuccess(false);
  }, [formik.errors, formikName]);

  React.useEffect(() => {
    const fieldValue = formik.values[formikName];

    if (fieldValue !== '' && fieldValue !== 'N/A') {
      setValue(fieldValue);
      setIsSuccess(true);
    }
  }, [formik.values, formikName]);

  return (
    <FormControl
      id={`FormControl-id-${formikName}`}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 1,
        marginTop: '10px',

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
          color={isDisabled ? TEXT_DISABLED : TEXT}
        />

        {tooltipMessage && <InputTooltip text={tooltipMessage} />}
      </Box>

      <Select
        value={value}
        onChange={handleChange}
        error={hasError}
        disabled={isDisabled}
        id={`select-id-${formikName}`}
        name={formikName}
        size="small"
        fullWidth
        displayEmpty
        sx={{
          backgroundColor: isDisabled ? DISABLED_GRAY : WHITE_BG,
        }}
        renderValue={(value) => {
          if (value === '') {
            return (
              <Typographies
                type={enumsTypographies.body1}
                label={placeholder || ''}
                color={isDisabled ? TEXT_DISABLED : TEXT}
              />
            );
          }
          return value;
        }}
      >
        {menuOptions.map((option) => {
          return (
            <MenuItem
              key={option}
              value={option}
              sx={{
                mt: 1,
                mb: 1,
              }}
            >
              {option}
            </MenuItem>
          );
        })}
      </Select>

      <Typographies
        type={enumsTypographies.body5}
        label={errorMessage}
        color={ERROR}
      />
    </FormControl>
  );
};

export default NativeSelector;
