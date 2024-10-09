import * as React from 'react';
import dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { errorCodes } from '../../../utils/formsValidations';
import {
  TEXT,
  TEXT_DISABLED,
  ERROR,
  WHITE_BG,
  MAIN_VIOLET,
  MAIN_VIOLEN_SHADOW,
  SUCCESS,
  SUCCESS_SHADOW,
  DISABLED_GRAY,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  handleAction: (value: string) => void;
  isDisabled?: boolean;
  formikName: string;
  formik: any;
};

const DateCalendar = ({
  label,
  handleAction,
  isDisabled,
  formikName,
  formik,
}: Props) => {
  const [value, setValue] = React.useState<Dayjs | null>(null);
  const [hasError, setHasError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleChange = (newValue: Dayjs | null) => {
    handleAction(newValue?.format('YYYY-MM-DD') || '');
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
      const date = dayjs(fieldValue);
      setValue(date);
      setIsSuccess(true);
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Typographies
          label={label}
          type={enumsTypographies.body2}
          color={isDisabled ? TEXT_DISABLED : TEXT}
        />

        <DatePicker
          value={value}
          onChange={handleChange}
          disabled={isDisabled}
          disableFuture
          disableHighlightToday
          sx={{
            width: '100%',
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
          slotProps={{
            layout: {
              sx: {
                width: '100%',
                color: MAIN_VIOLET,
                borderRadius: '6px',
                borderWidth: '1px',
                border: '1px solid',
                backgroundColor: WHITE_BG,
              },
            },
            day: {
              sx: {
                '&.MuiPickersDay-root': {
                  color: MAIN_VIOLET,

                  '&.Mui-selected': {
                    backgroundColor: MAIN_VIOLET,
                    color: WHITE_BG,
                    boxShadow: `0 0 0 1px ${MAIN_VIOLEN_SHADOW}`,
                  },
                },
              },
            },
            yearButton: {
              sx: {
                color: MAIN_VIOLET,

                '&:hover': {
                  color: WHITE_BG,
                  backgroundColor: MAIN_VIOLET,
                },
              },
            },
            switchViewIcon: {
              sx: {
                color: MAIN_VIOLET,
              },
            },
            rightArrowIcon: {
              sx: {
                color: MAIN_VIOLET,
              },
            },
            previousIconButton: {
              sx: {
                color: MAIN_VIOLET,
              },
            },
          }}
        />

        <Typographies
          label={errorMessage}
          type={enumsTypographies.body5}
          color={ERROR}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DateCalendar;
