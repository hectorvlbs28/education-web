import { useState, useCallback } from 'react';
import { Box, Stack, FormControlLabel, Checkbox } from '@mui/material';
import DocStatus from '../../../components/uikit/docstatus/docstatus';
import SvgIcons from '../../../utils/iconsEnums';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import {
  WHITE_BG,
  TEXT_PRIMARY,
  BORDER_BLUE,
} from '../../../assets/globalcolors';

type Props = {
  docStatus: number;
  label: string;
  fileName: string;
  isApplicant: boolean;
};

const StudentDocItem = ({ docStatus, label, fileName, isApplicant }: Props) => {
  const [check, setCheck] = useState(false);

  const handleCheckbox = useCallback(() => {
    setCheck((prevCheck) => !prevCheck);
  }, []);

  const boxStyles = {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    p: 2,
    backgroundColor: WHITE_BG,
  };

  const stackStyles = {
    alignItems: 'center',
  };

  const imgStyles = {
    width: 36,
    height: 36,
  };

  const columnStackStyles = {
    justifyContent: 'center',
    alignItems: 'flex-start',
  };

  return (
    <Box sx={boxStyles}>
      <Stack direction="row" spacing={2} sx={stackStyles}>
        {isApplicant && (
          <FormControlLabel
            control={<Checkbox checked={check} onChange={handleCheckbox} />}
            label=""
          />
        )}

        <img src={SvgIcons.FileBlue} alt="icon" style={imgStyles} />

        <Stack direction="column" spacing={0} sx={columnStackStyles}>
          <Typographies
            label={label}
            type={enumsTypographies.body3Bold}
            color={TEXT_PRIMARY}
          />

          <Typographies
            label={fileName}
            type={enumsTypographies.body3}
            color={BORDER_BLUE}
            extraStyles={{ textDecoration: 'underline' }}
          />
        </Stack>
      </Stack>

      <DocStatus docStatus={docStatus} />
    </Box>
  );
};

export default StudentDocItem;
