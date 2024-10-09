import * as React from 'react';
import {
  Radio,
  RadioGroup as MuiRadioGroup,
  FormControlLabel,
  FormControl,
} from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { errorCodes } from '../../../utils/formsValidations';
import {
  TEXT,
  MAIN_VIOLET,
  STROKE_GREY,
  DISABLED_GRAY,
  TEXT_DISABLED,
  WHITE_BG,
  ERROR,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  isDisabled?: boolean;
  radioOptions: string[];
  handleChangeAction: (value: string) => void;
  formikName: string;
  formik: any;
};

const RadioGroup = ({
  label,
  isDisabled,
  radioOptions,
  handleChangeAction,
  formikName,
  formik,
}: Props) => {
  const [value, setValue] = React.useState('');
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    handleChangeAction((event.target as HTMLInputElement).value);
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
      setValue(fieldValue);
    }
  }, [formik.values, formikName]);

  return (
    <FormControl
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: 1,
        marginTop: '10px',
      }}
    >
      <Typographies
        label={label}
        type={enumsTypographies.body2}
        color={isDisabled ? TEXT_DISABLED : TEXT}
      />

      <MuiRadioGroup
        value={value}
        onChange={handleChange}
        sx={{
          width: 'auto',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        {radioOptions.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio color="success" disabled={isDisabled} />}
            label={option}
            disabled={isDisabled}
            sx={{
              border: `2px solid ${
                isDisabled
                  ? DISABLED_GRAY
                  : value === option
                  ? MAIN_VIOLET
                  : STROKE_GREY
              }`,
              color: isDisabled
                ? TEXT_DISABLED
                : value === option
                ? MAIN_VIOLET
                : TEXT,
              ml: '0px',
              paddingLeft: '14px',
              paddingRight: '28px',
              borderRadius: '5px',
              backgroundColor:
                value === option
                  ? WHITE_BG
                  : isDisabled
                  ? DISABLED_GRAY
                  : 'transparent',
            }}
          />
        ))}
      </MuiRadioGroup>

      {hasError && (
        <Typographies
          label={errorMessage}
          type={enumsTypographies.body5}
          color={ERROR}
        />
      )}
    </FormControl>
  );
};

export default RadioGroup;
