import { Button } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { BORDER_BLUE } from '../../../assets/globalcolors';

type Props = {
  label: string;
  handleClick?: () => void;
};

const Hyperlink = ({ label, handleClick }: Props) => {
  const handleLocalClick = () => {
    if (handleClick) {
      handleClick();
    }
  };

  return (
    <Button
      variant="text"
      sx={{
        p: 0,
        //texto subrayado
        textDecoration: 'underline',
      }}
    >
      <Typographies
        label={label}
        type={enumsTypographies.body5}
        color={BORDER_BLUE}
      />
    </Button>
  );
};

export default Hyperlink;
