import { Box } from '@mui/material';
import { TEXT, TEXT_GRAY } from '../../../assets/globalcolors';
import Mexican from '../../documentation/forms/mexican/mexican';
import ForeignerCurp from '../../documentation/forms/foreignercurp/foreignercurp';
import ForeignerNoCurp from '../../documentation/forms/foreignernocurp/foreignernocurp';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';

const HEADERTEXT = [
  {
    label: 'Sube tu documentación',
    type: enumsTypographies.headline2,
    color: TEXT,
  },
  {
    label:
      'Para finalizar tu inscripción al curso, te solicitamos los siguientes documentos obligatorios.',
    type: enumsTypographies.body1,
    color: TEXT,
  },
  {
    label: 'Formato permitido: PDF  / Peso máx: 5 MB',
    type: enumsTypographies.body5,
    color: TEXT_GRAY,
  },
];

type Props = {
  formType: string;
  handleSaveStudentDocumentations: (formData: FormData) => void;
};

const Documentation = ({
  formType,
  handleSaveStudentDocumentations,
}: Props) => {
  const renderTextBlocks = (
    textArray: { label: string; type: string; color?: string }[]
  ) =>
    textArray.map((text, index) => (
      <Typographies
        key={index}
        label={text.label}
        type={text.type as keyof typeof enumsTypographies}
        color={text.color}
      />
    ));

  const handleSendFormData = (formData: FormData) => {
    handleSaveStudentDocumentations(formData);
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      {renderTextBlocks(HEADERTEXT)}

      {formType === 'mexican' && (
        <Mexican handleSendFormData={handleSendFormData} />
      )}
      {formType === 'foreignerCurp' && (
        <ForeignerCurp handleSendFormData={handleSendFormData} />
      )}
      {formType === 'foreignerNoCurp' && (
        <ForeignerNoCurp handleSendFormData={handleSendFormData} />
      )}
    </Box>
  );
};

export default Documentation;
