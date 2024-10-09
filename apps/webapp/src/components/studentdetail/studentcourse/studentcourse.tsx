import { Box, Stack } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import Typographies from '../../uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import {
  TEXT_PRIMARY,
  BORDER_BLUE,
  BG_GRAY_237,
  SUCCESS,
} from '../../../assets/globalcolors';

type Props = {
  label: string;
  percentage: number;
  qualification: string;
  icon: string;
};

const StudentCourse = ({ label, percentage, qualification, icon }: Props) => {
  const boxStyles = {
    display: 'flex',
    alignContent: 'center',
    gap: 2,
  };

  const imgStyles = {
    width: 42,
    height: 42,
  };

  return (
    <Box
      width="100%"
      flexDirection="row"
      sx={{
        ...boxStyles,
        p: 2,
        backgroundColor: 'white',
      }}
    >
      <img src={icon} alt="icon" style={imgStyles} />

      <Box
        width="90%"
        flexDirection="column"
        sx={{
          ...boxStyles,
        }}
      >
        <Box display="flex" flexDirection="row" gap={2}>
          <Typographies
            label={label}
            type={enumsTypographies.body3Bold}
            color={TEXT_PRIMARY}
          />

          <Typographies
            label={`${percentage}%`}
            type={enumsTypographies.body3}
            color={TEXT_PRIMARY}
          />
        </Box>

        {qualification !== '' && (
          <Typographies
            label={`Calificación: ${qualification}`}
            type={enumsTypographies.body3}
            color={BORDER_BLUE}
            extraStyles={{ textDecoration: 'underline' }}
          />
        )}

        {qualification === '' && (
          <Box width="70%">
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                color: 'red',
                backgroundColor: BG_GRAY_237,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: SUCCESS,
                },
              }}
            />

            <Box marginTop={1} display="flex" flexDirection="row">
              <Typographies
                label="En curso:"
                type={enumsTypographies.body3Bold}
                color={TEXT_PRIMARY}
              />

              <Typographies
                label="2nd semestre"
                type={enumsTypographies.body3}
                color={TEXT_PRIMARY}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Typographies
        label="En curso"
        type={enumsTypographies.body5}
        color={TEXT_PRIMARY}
      />
    </Box>
  );
};

export default StudentCourse;
