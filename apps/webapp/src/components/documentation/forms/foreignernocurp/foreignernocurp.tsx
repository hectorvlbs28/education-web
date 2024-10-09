import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { useFormik } from 'formik';
import InputFile from '../../inputfile/inputfile';
import useValidateonchange from '../../../../hooks/use-validateonchange/use-validateonchange';
import Main from '../../../../components/buttons/main/main';
import SvgIcons from '../../../../utils/iconsEnums';
import DocumentationFile from '../../../../interfaces/DocumentationFile';
import {
  useAppDispatch,
  useDocumentationForeignerNoCurp,
  useAppSelector,
} from '../../../../hooks/use-redux/use-redux';
import { setDocumentationForeignerNoCurp } from '../../../../redux/slices/enroll';
import { documentationForeignerNoCurpSchema } from '../../../../utils/formsValidations';
import { appendFileToFormData } from '../../../../utils/generalFunctions';

type Props = { handleSendFormData: (formData: FormData) => void };

const ForeignerNoCurp = ({ handleSendFormData }: Props) => {
  const dispatch = useAppDispatch();
  const documentationForeignerNoCurp = useDocumentationForeignerNoCurp();
  const { validateOnChange, toggleValidateOnChange } = useValidateonchange();
  const requiresPaymentReceipt = useAppSelector(
    (state) => state.enrollSlice.requiresPaymentReceipt
  );
  const [isDisabled, setIsDisabled] = useState(true);

  const initialValues = {
    dni: { fileName: '', file: '' },
    paymentReceipt: { fileName: '', file: '' },
  };
  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: documentationForeignerNoCurpSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      dispatch(setDocumentationForeignerNoCurp(values));
      const formData = new FormData();
      const types: string[] = [];

      const handleOptionalFile = (doc: DocumentationFile, key: string) => {
        if (doc.fileName && doc.fileName !== 'N/A') {
          appendFileToFormData(doc, key, formData, types);
        }
      };

      const { dni, paymentReceipt } = documentationForeignerNoCurp;
      appendFileToFormData(dni, 'dni', formData, types);
      handleOptionalFile(paymentReceipt, 'paymentReceipt');

      formData.append('types', JSON.stringify(types));

      handleSendFormData(formData);
    },
  });

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  useEffect(() => {
    setIsDisabled(!formik.isValid || !formik.dirty);
  }, [formik]);

  useEffect(() => {
    const shouldValidateOnChange = Object.keys(formik.errors).length > 0;
    if (shouldValidateOnChange !== validateOnChange) {
      toggleValidateOnChange();
    }
  }, [formik, toggleValidateOnChange, validateOnChange]);

  useEffect(() => {
    const { dni, paymentReceipt } = documentationForeignerNoCurp;

    formik.setFieldValue(initialValuesKeys[0], dni);
    formik.setFieldValue(initialValuesKeys[1], paymentReceipt);
  }, [documentationForeignerNoCurp]);

  useEffect(() => {
    if (requiresPaymentReceipt === false) {
      formik.setFieldValue(initialValuesKeys[1], {
        fileName: 'N/A',
        file: 'N/A',
      });
    }
  }, [requiresPaymentReceipt]);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <InputFile
        icon={SvgIcons.FilePink}
        label="Identificación DNI"
        formikName={initialValuesKeys[0]}
        formik={formik}
      />

      {requiresPaymentReceipt && (
        <InputFile
          icon={SvgIcons.FileBlue}
          label="Comprobante de pago"
          formikName={initialValuesKeys[1]}
          formik={formik}
        />
      )}

      <Main label="Enviar" isDisabled={isDisabled} onClick={handleSubmit} />
    </Box>
  );
};

export default ForeignerNoCurp;
