import { Box } from '@mui/material';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { TEXT_PRIMARY } from '../../../assets/globalcolors';

type Props = {
  label: string;
  value: string;
};

const StudentInfoRow = ({ label, value }: Props) => {
  return (
    <Box>
      <Typographies
        label={label}
        type={enumsTypographies.body3Bold}
        color={TEXT_PRIMARY}
      />

      <Typographies
        label={value}
        type={enumsTypographies.body3}
        color={TEXT_PRIMARY}
      />
    </Box>
  );
};

export default StudentInfoRow;
