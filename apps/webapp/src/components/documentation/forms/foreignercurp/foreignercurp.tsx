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
  useDocumentationForeignerCurp,
  useAppSelector,
} from '../../../../hooks/use-redux/use-redux';
import { setDocumentationForeignerCurp } from '../../../../redux/slices/enroll';
import { documentationForeignerCurpSchema } from '../../../../utils/formsValidations';
import { appendFileToFormData } from '../../../../utils/generalFunctions';

type Props = {
  handleSendFormData: (formData: FormData) => void;
};

const ForeignerCurp = ({ handleSendFormData }: Props) => {
  const dispatch = useAppDispatch();
  const documentationForeignerCurp = useDocumentationForeignerCurp();
  const { validateOnChange, toggleValidateOnChange } = useValidateonchange();
  const requiresPaymentReceipt = useAppSelector(
    (state) => state.enrollSlice.requiresPaymentReceipt
  );
  const [isDisabled, setIsDisabled] = useState(true);

  const initialValues = {
    dni: { fileName: '', file: '' },
    curp: { fileName: '', file: '' },
    certificateOfStudies: { fileName: '', file: '' },
    paymentReceipt: { fileName: '', file: '' },
  };
  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: documentationForeignerCurpSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      dispatch(setDocumentationForeignerCurp(values));
      const formData = new FormData();
      const types: string[] = [];

      const handleOptionalFile = (doc: DocumentationFile, key: string) => {
        if (doc.fileName && doc.fileName !== 'N/A') {
          appendFileToFormData(doc, key, formData, types);
        }
      };

      const { dni, curp, certificateOfStudies, paymentReceipt } = values;
      appendFileToFormData(dni, 'dni', formData, types);
      appendFileToFormData(curp, 'curp', formData, types);
      handleOptionalFile(certificateOfStudies, 'certificateOfStudies');
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
    const { dni, curp, certificateOfStudies, paymentReceipt } =
      documentationForeignerCurp;

    formik.setFieldValue(initialValuesKeys[0], dni);
    formik.setFieldValue(initialValuesKeys[1], curp);
    formik.setFieldValue(initialValuesKeys[2], certificateOfStudies);
    formik.setFieldValue(initialValuesKeys[3], paymentReceipt);
  }, [documentationForeignerCurp]);

  useEffect(() => {
    if (requiresPaymentReceipt === false) {
      formik.setFieldValue(initialValuesKeys[3], {
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

      <InputFile
        icon={SvgIcons.FileBlue}
        label="CURP"
        formikName={initialValuesKeys[1]}
        formik={formik}
      />

      <InputFile
        icon={SvgIcons.FileBlue}
        label="Certificado de último grado de estudios"
        formikName={initialValuesKeys[2]}
        formik={formik}
        hasCheckbox={true}
        checkboxLabel="Aún no tengo mi certificado, lo subiré después."
      />

      {requiresPaymentReceipt && (
        <InputFile
          icon={SvgIcons.FileBlue}
          label="Comprobante de pago"
          formikName={initialValuesKeys[3]}
          formik={formik}
        />
      )}

      <Main label="Enviar" isDisabled={isDisabled} onClick={handleSubmit} />
    </Box>
  );
};

export default ForeignerCurp;
