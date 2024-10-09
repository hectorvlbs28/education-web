import { Box } from '@mui/material';
import { RotatingLines } from 'react-loader-spinner';
import Typographies from '../../uikit/typographies/typographies';
import Main from '../../buttons/main/main';
import { enumsTypographies } from '../../../utils/enums';
import { MAIN_VIOLET } from '../../../assets/globalcolors';

type Props = {
  Done: string;
  handleClick: () => void;
  loadingDocumentations: boolean;
};

const UploadingDocuments = ({
  Done,
  handleClick,
  loadingDocumentations,
}: Props) => {
  if (loadingDocumentations) {
    return (
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <RotatingLines
          visible={true}
          width="34"
          strokeWidth="3"
          animationDuration="0.75"
          strokeColor={MAIN_VIOLET}
        />

        <Typographies
          label="Estamos procesando el envío de tu documentación."
          type={enumsTypographies.headline2}
          align="center"
        />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <img src={Done} alt="done" />

      <Typographies
        label="Tu documentación fue enviada exitosamente"
        type={enumsTypographies.headline2}
        align="center"
      />

      <Typographies
        label="Tu documentación será revisada en las próximas 24 horas, y te informaremos una vez que sea aprobada."
        type={enumsTypographies.body1}
        align="center"
      />

      <Main label="Entendido" isDisabled={false} onClick={handleClick} />
    </Box>
  );
};

export default UploadingDocuments;
