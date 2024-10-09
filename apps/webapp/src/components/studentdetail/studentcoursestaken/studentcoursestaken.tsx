import { Box, Stack } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import StudentEmptyCourses from '../studentemptycourses/studentemptycourses';
import StudentCourse from '../studentcourse/studentcourse';
import SvgIcons from '../../../utils/iconsEnums';
import { enumsTypographies } from '../../../utils/enums';
import { TEXT_PRIMARY } from '../../../assets/globalcolors';

type Props = {
  isApplicant: boolean;
};

function StudentCoursesTaken({ isApplicant }: Props) {
  const boxStyles = {
    width: '100%',
    display: 'flex',
    alignContent: 'center',
    gap: 2,
  };

  return (
    <Box {...boxStyles} flexDirection="column" justifyContent="flex-start">
      <Box {...boxStyles} flexDirection="row" justifyContent="space-between">
        <Typographies
          label="Cursos Realizados"
          type={enumsTypographies.body2}
          color={TEXT_PRIMARY}
        />
      </Box>

      {isApplicant && <StudentEmptyCourses />}

      {!isApplicant && (
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mt: 2,
          }}
        >
          <StudentCourse
            label="Diseño de Modas"
            percentage={50}
            qualification=""
            icon={SvgIcons.DressIcon}
          />
        </Stack>
      )}
    </Box>
  );
}

export default StudentCoursesTaken;
