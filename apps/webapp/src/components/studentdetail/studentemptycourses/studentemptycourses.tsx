import { Box, Stack } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import SvgIcons from '../../../utils/iconsEnums';
import { enumsTypographies } from '../../../utils/enums';
import { WHITE_BG, TEXT_PRIMARY } from '../../../assets/globalcolors';

const StudentEmptyCourses = () => {
  return (
    <Stack
      direction="column"
      spacing={0}
      sx={{
        alignItems: 'center',
        p: 2,
        backgroundColor: WHITE_BG,
      }}
    >
      <Stack direction="row" spacing={2}>
        {[0, 1, 2].map((index) => {
          return (
            <Box
              key={index}
              sx={{
                width: '280px',
                height: '150px',
                background: 'linear-gradient(180deg, #F5F5F5 0%, #FAFAFA 100%)',
              }}
            />
          );
        })}
      </Stack>

      <Stack
        direction="column"
        spacing={2}
        sx={{
          mt: '-70px',
          mb: 10,
          alignItems: 'center',
        }}
      >
        <img
          src={SvgIcons.CoursesEmpty}
          alt="empty-courses"
          style={{
            width: '80px',
            height: '65px',
          }}
        />

        <Typographies
          label="Este estudiante aún no ha completado cursos"
          type={enumsTypographies.body2}
          color={TEXT_PRIMARY}
          align="center"
        />

        <Typographies
          label="Cuando inicie su primer curso podrás ver el historial aquí"
          type={enumsTypographies.body3}
          color={TEXT_PRIMARY}
          align="center"
        />
      </Stack>
    </Stack>
  );
};

export default StudentEmptyCourses;
