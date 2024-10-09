import { Button, Typography } from '@mui/material';
import {
  MAIN_VIOLEN_GRADIENT,
  WHITE_BG,
  BUTTON_DISABLED,
  TEXT_DISABLED,
  MAIN_VIOLET,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  isDisabled: boolean;
  onClick: () => void;
  bgColor?: string;
  icon?: string;
};

const Main = ({ label, isDisabled, onClick, bgColor, icon }: Props) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      fullWidth
      disabled={isDisabled}
      sx={{
        background: bgColor || MAIN_VIOLEN_GRADIENT,
        color: bgColor ? MAIN_VIOLET : WHITE_BG,
        mt: 2,
        mb: 2,
        minHeight: '40px',
        borderRadius: '5px',
        padding: '8px, 24px, 8px, 24px',

        '&.MuiButton-contained.Mui-disabled': {
          background: BUTTON_DISABLED,
          color: TEXT_DISABLED,
        },

        '&:hover': {
          background: MAIN_VIOLEN_GRADIENT,
          color: WHITE_BG,
        },
      }}
    >
      {icon && (
        <img
          src={icon}
          alt="icon"
          style={{
            width: '20px',
            height: '20px',
            marginRight: '10px',
          }}
        />
      )}

      <Typography variant="body1">{label}</Typography>
    </Button>
  );
};

export default Main;
