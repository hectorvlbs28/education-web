import { useState, useEffect } from 'react';
import { Box, Stack, Divider } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import HeadCell from '../../../interfaces/HeadCell';
import AdminTableRow from '../../../interfaces/AdminTableRow';
import AdminTable from '../../../components/uikit/admintable/admintable';
import { enumsTypographies } from '../../../utils/enums';
import { ICON_TABLE_BLUE } from '../../../assets/globalcolors';

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Nombre del aspirante',
  },
  {
    id: 'enrolledCourse',
    label: 'Curso inscrito',
  },
  {
    id: 'courseGroup',
    label: 'Grupo',
  },
  {
    id: 'studentStatus',
    label: 'Estatus del alumno',
  },
];

const AdminStudents = () => {
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

  useEffect(() => {
    const data = [
      createData(
        1,
        'María Fernanda Espinosa',
        'Diseño de modas',
        'A',
        'Activo'
      ),
      createData(2, 'Juan Carlos Pérez', 'Diseño de modas', 'B', 'Activo'),
      createData(
        3,
        'María Fernanda Espinosa',
        'Diseño de modas',
        'A',
        'Activo'
      ),
      createData(4, 'Juan Carlos Pérez', 'Diseño de modas', 'B', 'Activo'),
      createData(
        5,
        'María Fernanda Espinosa',
        'Diseño de modas',
        'A',
        'Activo'
      ),
      createData(6, 'Juan Carlos Pérez', 'Diseño de modas', 'B', 'Activo'),
      createData(
        7,
        'María Fernanda Espinosa',
        'Diseño de modas',
        'A',
        'Activo'
      ),
      createData(8, 'Juan Carlos Pérez', 'Diseño de modas', 'B', 'Activo'),
    ];

    setRows(data);
  }, []);

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
        <Typographies
          label="Alumnos"
          type={enumsTypographies.headline2}
          color={ICON_TABLE_BLUE}
        />

        <Typographies
          label={`${rows.length} alumnos`}
          type={enumsTypographies.body3}
          color={ICON_TABLE_BLUE}
        />
      </Stack>

      <AdminTable
        tableTitle="Aspirantes-table"
        headCells={headCells}
        data={rows}
        rowType="alumno"
      />
    </Box>
  );
};

export default AdminStudents;
