import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { MAIN_VIOLET } from '../../../assets/globalcolors';

type Props = {
  text: string;
  path: string;
  handleAction?: () => void;
};

const Navigate = ({ text, path, handleAction }: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (handleAction) {
      handleAction();
    }
    navigate(path);
  };

  return (
    <Button
      variant="text"
      disableFocusRipple={true}
      disableRipple={true}
      disableTouchRipple={true}
      onClick={handleClick}
      sx={{
        color: MAIN_VIOLET,
        padding: 0,
        border: 'none',
        borderBottom: `1px solid ${MAIN_VIOLET}`,
        borderRadius: '0px',
      }}
    >
      <Typographies
        label={text}
        type={enumsTypographies.body1}
        color={MAIN_VIOLET}
      />
    </Button>
  );
};

export default Navigate;
