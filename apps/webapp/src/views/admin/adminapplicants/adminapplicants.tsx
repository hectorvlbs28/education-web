import { useState, useEffect } from 'react';
import { Box, Stack, Divider } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import AdminTable from '../../../components/uikit/admintable/admintable';
import HeadCell from '../../../interfaces/HeadCell';
import AdminTableRow from '../../../interfaces/AdminTableRow';
import { enumsTypographies } from '../../../utils/enums';
import { ICON_TABLE_BLUE } from '../../../assets/globalcolors';

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    label: 'Nombre del aspirante',
  },
  {
    id: 'selectedCourse',
    label: 'Curso seleccionado',
  },
  {
    id: 'entryDate',
    label: 'Registro',
  },
  {
    id: 'lastActivity',
    label: 'Ultima actividad',
  },
  {
    id: 'studentStatus',
    label: 'Estatus',
  },
];

const AdminApplicants = () => {
  const [rows, setRows] = useState<AdminTableRow[]>([]);

  function createData(
    id: number,
    name: string,
    selectedCourse: string,
    entryDate: string,
    lastActivity: string,
    studentStatus: string
  ): AdminTableRow {
    return {
      id,
      name,
      selectedCourse,
      entryDate,
      lastActivity,
      studentStatus,
    };
  }

  useEffect(() => {
    const data = [
      createData(
        1,
        'María Fernanda Espinosa',
        'Diseño de modas',
        'Jul 16, 2024',
        'Hace 45 mins',
        'Preaprobado'
      ),
      createData(
        2,
        'Juan Pérez',
        'Ingeniería de Software',
        'Aug 10, 2024',
        'Hace 1 hora',
        'Aprobado'
      ),
      createData(
        3,
        'Ana Gómez',
        'Medicina',
        'Sep 5, 2024',
        'Hace 30 mins',
        'Pendiente'
      ),
      createData(
        4,
        'Carlos López',
        'Derecho',
        'Oct 12, 2024',
        'Hace 2 horas',
        'Rechazado'
      ),
      createData(
        5,
        'Lucía Martínez',
        'Arquitectura',
        'Nov 20, 2024',
        'Hace 15 mins',
        'Preaprobado'
      ),
      createData(
        6,
        'Miguel Torres',
        'Economía',
        'Dec 1, 2024',
        'Hace 3 horas',
        'Aprobado'
      ),
      createData(
        7,
        'Sofía Ramírez',
        'Psicología',
        'Jan 25, 2025',
        'Hace 10 mins',
        'Pendiente'
      ),
      createData(
        8,
        'David Fernández',
        'Biología',
        'Feb 14, 2025',
        'Hace 5 mins',
        'Rechazado'
      ),
      createData(
        9,
        'Laura Sánchez',
        'Química',
        'Mar 3, 2025',
        'Hace 20 mins',
        'Preaprobado'
      ),
      createData(
        10,
        'José Hernández',
        'Física',
        'Apr 18, 2025',
        'Hace 50 mins',
        'Aprobado'
      ),
      createData(
        11,
        'Elena Ruiz',
        'Matemáticas',
        'May 22, 2025',
        'Hace 25 mins',
        'Pendiente'
      ),
      createData(
        12,
        'Pedro García',
        'Historia',
        'Jun 30, 2025',
        'Hace 1 hora',
        'Rechazado'
      ),
      createData(
        13,
        'María José Pérez',
        'Geografía',
        'Jul 16, 2025',
        'Hace 15 mins',
        'Preaprobado'
      ),
    ];

    setRows(data);
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      gap={4}
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
          label="Apirantes"
          type={enumsTypographies.headline2}
          color={ICON_TABLE_BLUE}
        />

        <Typographies
          label={`${rows.length} aspirantes`}
          type={enumsTypographies.body3}
          color={ICON_TABLE_BLUE}
        />
      </Stack>

      <AdminTable
        tableTitle="Aspirantes-table"
        headCells={headCells}
        data={rows}
        rowType="aspirante"
      />
    </Box>
  );
};

export default AdminApplicants;
