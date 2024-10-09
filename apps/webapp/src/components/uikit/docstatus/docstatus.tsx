import React from 'react';
import { Box } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import {
  STATUS_GREEN,
  STATUS_TEXT_GREEN,
  STATUS_RED,
  STATUS_TEXT_RED,
  STATUS_GRAY,
  STATUS_TEXT_GRAY,
  STATUS_GRAY_2,
  TEXT_PRIMARY,
} from '../../../assets/globalcolors';

type Props = {
  docStatus: number;
};

const DocStatus = ({ docStatus }: Props) => {
  const [textColor, setTextcolor] = React.useState(STATUS_TEXT_GREEN);
  const [bgColor, setBgColor] = React.useState(STATUS_GREEN);
  const [status, setStatus] = React.useState('Aprobado');

  React.useEffect(() => {
    switch (docStatus) {
      case 0:
        setTextcolor(STATUS_TEXT_GREEN);
        setBgColor(STATUS_GREEN);
        setStatus('Aprobado');
        break;
      case 1:
        setTextcolor(STATUS_TEXT_RED);
        setBgColor(STATUS_RED);
        setStatus('Rechazado');
        break;
      case 2:
        setTextcolor(STATUS_TEXT_GRAY);
        setBgColor(STATUS_GRAY);
        setStatus('Documento pendiente');
        break;
      case 3:
        setTextcolor(TEXT_PRIMARY);
        setBgColor(STATUS_GRAY_2);
        setStatus('Por revisar');
        break;
      default:
        setTextcolor(STATUS_TEXT_GREEN);
        setBgColor(STATUS_GREEN);
        break;
    }
  }, [docStatus]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignContent="center"
      justifyContent="center"
      sx={{
        width: 'auto',
        height: '30px',
        p: 1,
        backgroundColor: bgColor,
        border: `1px solid ${bgColor}`,
      }}
    >
      <Typographies
        label={status}
        type={enumsTypographies.body5}
        color={textColor}
      />
    </Box>
  );
};

export default DocStatus;
