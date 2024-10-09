import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Typography } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import {
  TEXT,
  WHITE_BG,
  STROKE_GREY,
  ICON_BLUE,
} from '../../../assets/globalcolors';
import { enumsTypographies } from '../../../utils/enums';

const CurpMessage = () => {
  return (
    <Box
      sx={{
        backgroundColor: WHITE_BG,
        border: `1px solid ${STROKE_GREY}`,
        borderRadius: '4px',
        padding: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 2,
      }}
    >
      <ErrorOutlineIcon sx={{ color: ICON_BLUE, mt: '2px' }} />

      <Typographies
        label="Recibirás un diploma al completar el curso, pero este no tendrá validez
        oficial en México."
        type={enumsTypographies.body1}
        color={TEXT}
      />
    </Box>
  );
};

export default CurpMessage;
