import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Tooltip from '@mui/material/Tooltip';
import useMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import { BORDER_BLUE } from '../../../assets/globalcolors';

type Props = {
  text: string;
};

const InputTooltip = ({ text }: Props) => {
  const { isMobile } = useMediaquery();
  const fontSize = isMobile ? 'small' : 'medium';

  return (
    <Tooltip
      title={text}
      sx={{
        cursor: 'pointer',
      }}
    >
      <HelpOutlineIcon
        fontSize={fontSize}
        sx={{
          color: BORDER_BLUE,
        }}
      />
    </Tooltip>
  );
};

export default InputTooltip;
