import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  STROKE_GREY,
  TEXT,
  TEXT_GRAY,
  ERROR,
  WHITE_BG,
  BORDER_BLUE,
} from '../../../assets/globalcolors';
import SvgIcons from '../../../utils/iconsEnums';
import Typographies from '../../../components/uikit/typographies/typographies';
import { errorCodes } from '../../../utils/formsValidations';
import { enumsTypographies } from '../../../utils/enums';

const style = {
  container: {
    width: '100%',
    borderRadius: '4px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 2,
    backgroundColor: WHITE_BG,
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 3,
  },
  iconStyle: {
    width: 36,
    height: 36,
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    gap: 1,
  },
  labelStyle: {
    fontWeight: 'normal',
    color: TEXT,
  },
  subLabelStyle: {
    fontWeight: 'normal',
    color: TEXT_GRAY,
  },
  uploadIconStyle: {
    width: 22,
    height: 22,
  },
};

type Props = {
  icon: string;
  label: string;
  subLabel?: string;
  formikName: string;
  formik: any;
  hasCheckbox?: boolean;
  checkboxLabel?: string;
};

const InputFile = ({
  icon,
  label,
  subLabel,
  formikName,
  formik,
  hasCheckbox,
  checkboxLabel,
}: Props) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [diableInput, setDisableInput] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [check, setCheck] = useState(false);
  const [disableCheckbox, setDisableCheckbox] = useState(false);
  const hasFile = file !== null;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDisableCheckbox(true);
      if (file.size > 5 * 1024 * 1024) {
        setHasError(true);
        setErrorMessage('El archivo no puede ser mayor a 5MB');
      } else {
        setHasError(false);
        setErrorMessage('');
        setFileName(file.name);
        setFileSize(file.size);

        const reader = new FileReader();
        reader.onloadend = () => {
          setFile(reader.result as string);

          formik.setFieldValue(formikName, {
            fileName: file.name,
            file: reader.result,
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleDeleteFile = () => {
    setFileName(null);
    setFile(null);
    setDisableCheckbox(false);

    formik.setFieldValue(formikName, {
      fileName: '',
      file: '',
    });
  };

  const formatFileSize = (size: number | null) => {
    if (size === null) return '0 MB';
    return `${(size / 1024 / 1024).toFixed(2)} MB`;
  };

  const handleCheckbox = () => {
    setCheck(!check);

    if (!check) {
      setDisableInput(true);
      formik.setFieldValue(formikName, {
        fileName: 'N/A',
        file: 'N/A',
      });
    } else {
      setDisableInput(false);
      formik.setFieldValue(formikName, {
        fileName: '',
        file: '',
      });
    }
  };

  useEffect(() => {
    const error = formik.errors[formikName];
    let hasError = false;
    let errorMessage = '';

    if (error) {
      hasError = true;
      switch (error.file) {
        case errorCodes.required:
          errorMessage = 'Campo obligatório';
          break;
      }
    }

    setHasError(hasError);
    setErrorMessage(errorMessage);
  }, [formik.errors, formikName]);

  useEffect(() => {
    const fieldValue = formik.values[formikName];

    if (fieldValue.fileName !== '' && fieldValue.file !== '') {
      if (fieldValue.fileName !== 'N/A' && fieldValue.file !== 'N/A') {
        setFileName(fieldValue.fileName);
        setFile(fieldValue.file);
      } else {
        setCheck(true);
        setDisableInput(true);
      }
    }
  }, [formik.values, formikName]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          ...style.container,
          border: `1px solid ${
            hasError ? ERROR : hasFile ? BORDER_BLUE : STROKE_GREY
          }`,
        }}
      >
        <Box
          sx={{
            ...style.iconContainer,
            alignItems: hasFile ? 'flex-start' : 'center',
          }}
        >
          {hasFile ? (
            <img src={SvgIcons.Done} alt="icon" style={style.iconStyle} />
          ) : (
            <img src={icon} alt="icon" style={style.iconStyle} />
          )}

          <Box sx={style.labelContainer}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typographies
                label={label}
                type={enumsTypographies.body1}
                color={TEXT}
              />

              {subLabel && (
                <Typographies
                  label={subLabel}
                  type={enumsTypographies.body4}
                  color={TEXT_GRAY}
                />
              )}
            </Box>

            {hasFile && (
              <Typographies
                label={`${formatFileSize(fileSize)} - ${fileName}`}
                type={enumsTypographies.body5}
                color={TEXT}
              />
            )}

            {hasCheckbox && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={check}
                    onChange={handleCheckbox}
                    disabled={disableCheckbox}
                  />
                }
                disabled={disableCheckbox}
                label={checkboxLabel}
              />
            )}
          </Box>
        </Box>

        {hasFile ? (
          <IconButton onClick={handleDeleteFile} disabled={diableInput}>
            <img
              src={SvgIcons.DeleteIcon}
              alt="delete icon"
              style={style.uploadIconStyle}
            />
          </IconButton>
        ) : (
          <>
            <input
              accept=".pdf"
              type="file"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              id={`file-input-${formikName}`}
              disabled={diableInput}
            />
            <label htmlFor={`file-input-${formikName}`}>
              <Button
                disabled={diableInput}
                variant="outlined"
                component="span"
                sx={{
                  border: 'none',
                  backgroundColor: 'transparent',

                  '&:hover': {
                    backgroundColor: 'transparent',
                  },
                }}
              >
                <img
                  src={SvgIcons.UploadFile}
                  alt="upload file"
                  style={style.uploadIconStyle}
                />
              </Button>
            </label>
          </>
        )}
      </Box>

      <Typographies
        label={errorMessage}
        type={enumsTypographies.body5}
        color={ERROR}
      />
    </Box>
  );
};

export default InputFile;
