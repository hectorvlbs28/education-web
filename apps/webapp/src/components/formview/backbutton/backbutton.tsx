import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { WHITE_BG } from '../../../assets/globalcolors';

type Props = {
  textColor: string;
  handleAction: () => void;
};

const BackButton = ({ textColor, handleAction }: Props) => {
  return (
    <Button
      variant="text"
      onClick={handleAction}
      sx={{
        color: textColor,
        display: 'flex',
        gap: 1,
        padding: 0,
      }}
    >
      <ArrowBackIcon
        sx={{
          width: 22,
          height: 22,
          color: textColor,
        }}
      />

      <Typographies
        label="Regresar"
        type={enumsTypographies.body3}
        color={WHITE_BG}
      />
    </Button>
  );
};

export default BackButton;
