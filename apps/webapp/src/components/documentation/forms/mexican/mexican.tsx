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
  useDocumentationMexican,
  useAppSelector,
} from '../../../../hooks/use-redux/use-redux';
import { setDocumentationMexican } from '../../../../redux/slices/enroll';
import { documentationMexicanSchema } from '../../../../utils/formsValidations';
import { appendFileToFormData } from '../../../../utils/generalFunctions';

type Props = {
  handleSendFormData: (formData: FormData) => void;
};

const Mexican = ({ handleSendFormData }: Props) => {
  const dispatch = useAppDispatch();
  const documentationMexican = useDocumentationMexican();
  const { validateOnChange, toggleValidateOnChange } = useValidateonchange();
  const requiresPaymentReceipt = useAppSelector(
    (state) => state.enrollSlice.requiresPaymentReceipt
  );
  const [isDisabled, setIsDisabled] = useState(true);

  const initialValues = {
    acta: { fileName: '', file: '' },
    curp: { fileName: '', file: '' },
    ineFront: { fileName: '', file: '' },
    ineBack: { fileName: '', file: '' },
    certificateOfStudies: { fileName: '', file: '' },
    paymentReceipt: { fileName: '', file: '' },
  };
  const initialValuesKeys = Object.keys(initialValues);

  const formik = useFormik({
    initialValues,
    validationSchema: documentationMexicanSchema,
    validateOnChange: validateOnChange,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: (values) => {
      dispatch(setDocumentationMexican(values));
      const formData = new FormData();
      const types: string[] = [];

      const handleOptionalFile = (doc: DocumentationFile, key: string) => {
        if (doc.fileName && doc.fileName !== 'N/A') {
          appendFileToFormData(doc, key, formData, types);
        }
      };

      const {
        acta,
        curp,
        ineFront,
        certificateOfStudies,
        paymentReceipt,
        ineBack,
      } = values;
      appendFileToFormData(acta, 'acta', formData, types);
      appendFileToFormData(curp, 'curp', formData, types);
      handleOptionalFile(ineFront, 'ineFront');
      handleOptionalFile(ineBack, 'ineBack');
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
    const {
      acta,
      curp,
      ineFront,
      ineBack,
      certificateOfStudies,
      paymentReceipt,
    } = documentationMexican;

    formik.setFieldValue(initialValuesKeys[0], acta);
    formik.setFieldValue(initialValuesKeys[1], curp);
    formik.setFieldValue(initialValuesKeys[2], ineFront);
    formik.setFieldValue(initialValuesKeys[3], ineBack);
    formik.setFieldValue(initialValuesKeys[4], certificateOfStudies);
    formik.setFieldValue(initialValuesKeys[5], paymentReceipt);
  }, [documentationMexican]);

  useEffect(() => {
    if (requiresPaymentReceipt === false) {
      formik.setFieldValue(initialValuesKeys[5], {
        fileName: 'N/A',
        file: 'N/A',
      });
    }
  }, [requiresPaymentReceipt]);

  useEffect(() => {
    if (
      formik.values.ineFront.fileName === 'N/A' &&
      formik.values.ineFront.file === 'N/A'
    ) {
      formik.setFieldValue(initialValuesKeys[3], {
        fileName: 'N/A',
        file: 'N/A',
      });
    }
  }, [formik.values.ineFront.fileName, formik.values.ineFront.file]);

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
        label="Acta de nacimiento"
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
        icon={SvgIcons.FilePink}
        label="INE"
        subLabel="(frente)"
        formikName={initialValuesKeys[2]}
        formik={formik}
        hasCheckbox={true}
        checkboxLabel="Por el momento no cuento con mi INE, la subiré en otro momento"
      />

      <InputFile
        icon={SvgIcons.FilePink}
        label="INE"
        subLabel="(reverso)"
        formikName={initialValuesKeys[3]}
        formik={formik}
      />

      <InputFile
        icon={SvgIcons.FileBlue}
        label="Certificado de último grado de estudios"
        formikName={initialValuesKeys[4]}
        formik={formik}
        hasCheckbox={true}
        checkboxLabel="Aún no tengo mi certificado, lo subiré después."
      />

      {requiresPaymentReceipt && (
        <InputFile
          icon={SvgIcons.FileBlue}
          label="Comprobante de pago"
          formikName={initialValuesKeys[5]}
          formik={formik}
        />
      )}

      <Main label="Enviar" isDisabled={isDisabled} onClick={handleSubmit} />
    </Box>
  );
};

export default Mexican;
