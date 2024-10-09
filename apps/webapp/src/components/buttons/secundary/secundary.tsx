import { Button, Typography } from '@mui/material';
import {
  BUTTON_DISABLED,
  TEXT_DISABLED,
  MAIN_VIOLET,
  BUTTON_SECONDARY_HOVER,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  isDisabled?: boolean;
  onClick: () => void;
};

const Secundary = ({ label, isDisabled, onClick }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      disabled={isDisabled}
      sx={{
        borderColor: MAIN_VIOLET,
        color: MAIN_VIOLET,
        fontWeight: '400',
        fontSize: '16px',
        lineHeight: '24px',
        '&:hover': {
          borderColor: MAIN_VIOLET,
          backgroundColor: BUTTON_SECONDARY_HOVER,
        },
        '&.MuiButton-contained.Mui-disabled': {
          background: BUTTON_DISABLED,
          color: TEXT_DISABLED,
        },
      }}
    >
      <Typography variant="body1">{label}</Typography>
    </Button>
  );
};

export default Secundary;