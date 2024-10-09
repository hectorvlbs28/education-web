import { useState } from 'react';
import { Box, Stack, Divider } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import HeadCell from '../../../interfaces/HeadCell';
import AdminTableRow from '../../../interfaces/AdminTableRow';
import { enumsTypographies } from '../../../utils/enums';

const headCells: readonly HeadCell[] = [
  {
    id: 'groupId',
    label: 'ID grupo',
  },
  {
    id: 'course',
    label: 'Materia',
  },
  {
    id: 'career',
    label: 'Carrera/Curso',
  },
  {
    id: 'semester',
    label: 'Semestre',
  },
  {
    id: 'enrolled',
    label: 'Inscritos',
  },
  {
    id: 'available',
    label: 'Disponible',
  },
  {
    id: 'status',
    label: 'Estatus ',
  },
];

const AdminGroups = () => {
  const [rows, setRows] = useState<AdminTableRow[]>([]);

  function createData(
    id: number,
    name: string,
    enrolledCourse: string,
    courseGroup: string,
    studentStatus: string
  ): AdminTableRow {
    return {
      id,
      name,
      enrolledCourse,
      courseGroup,
      studentStatus,
    };
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={2}
      width="100%"
    >
      <Stack
        divider={<Divider orientation="vertical" flexItem />}
        spacing="6px"
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typographies label="Grupos" type={enumsTypographies.headline2} />

        <Typographies
          label={`${rows.length} grupos`}
          type={enumsTypographies.body3}
        />
      </Stack>
    </Box>
  );
};

export default AdminGroups;
