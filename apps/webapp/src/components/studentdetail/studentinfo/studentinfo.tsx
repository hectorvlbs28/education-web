import React from 'react';
import { useState } from 'react';
import { Box, Stack, Tabs, Tab } from '@mui/material';
import UserAvatar from '../../uikit/useravatar/useravatar';
import Typographies from '../../uikit/typographies/typographies';
import StudentInfoRow from '../studentinforow/studentinforow';
import useMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import { enumsTypographies } from '../../../utils/enums';
import {
  STROKE_GREY_250,
  STROKE_GREY,
  TEXT_PRIMARY,
  DISABLED_GRAY,
} from '../../../assets/globalcolors';

const navItems = [
  {
    label: 'Datos de contacto',
    value: 0,
  },
  {
    label: 'Información personal',
    value: 1,
  },
];

const StudentInfo = () => {
  const { isMobile } = useMediaquery();

  const [studentDetailTab, setStudentDetailTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setStudentDetailTab(newValue);
  };

  return (
    <Box
      width="480px"
      minHeight="100vh"
      sx={{
        backgroundColor: STROKE_GREY_250,
        border: `1px solid ${STROKE_GREY}`,
        overflow: 'hidden',
      }}
    >
      <Stack
        direction="column"
        spacing={3}
        sx={{
          padding: '30px 20px 0 20px',
        }}
      >
        <Stack direction="row" spacing={1}>
          <UserAvatar displayPopper={false} label="AC" randomColor={true} />

          <Stack direction="column" spacing={0}>
            <Typographies
              label="Alexandra Elizabeth Carrión López"
              type={enumsTypographies.body3Bold}
              color={TEXT_PRIMARY}
            />

            <Typographies
              label="Preaprobado"
              type={enumsTypographies.body3}
              color={TEXT_PRIMARY}
            />
          </Stack>
        </Stack>

        <Tabs
          value={studentDetailTab}
          onChange={handleChange}
          centered
          orientation={isMobile ? 'vertical' : 'horizontal'}
          textColor="secondary"
          indicatorColor="secondary"
        >
          {navItems.map((item) => (
            <Tab
              key={item.value}
              value={item.value}
              label={item.label}
              sx={{
                textTransform: 'none',
              }}
            />
          ))}
        </Tabs>
      </Stack>

      <Stack
        direction="column"
        height="100%"
        spacing={3}
        sx={{
          padding: '20px',
          backgroundColor: DISABLED_GRAY,
        }}
      >
        {studentDetailTab === 0 && (
          <React.Fragment>
            <StudentInfoRow
              label="Correo electrónico"
              value="alexandracarrion@gmail.com"
            />
            <StudentInfoRow
              label="Teléfono con whatsapp"
              value="(55) 3232 5503"
            />
            <StudentInfoRow
              label="Domicilio"
              value="Av. División del norte 2424 int 303"
            />
            <StudentInfoRow label="Código postal" value="03300" />
            <StudentInfoRow label="Colonia" value="Portales Sur" />
            <StudentInfoRow label="Ciudad o delegación" value="Benito Juaréz" />
            <StudentInfoRow label="Estado" value="Ciudad de México" />
            <StudentInfoRow label="País" value="México" />
          </React.Fragment>
        )}

        {studentDetailTab === 1 && (
          <React.Fragment>
            <StudentInfoRow
              label="Fecha de nacimiento"
              value="20 de enero de 2008"
            />
            <StudentInfoRow
              label="Nombre del tutor"
              value="Leticia López Chavez"
            />
            <StudentInfoRow
              label="Sexo asignado en acta de nacimiento"
              value="Femenino"
            />
            <StudentInfoRow label="Nacionalidad" value="Mexicana" />
            <StudentInfoRow label="CURP" value="CALA080120MSRRRL01" />
            <StudentInfoRow
              label="Último grado de estudios"
              value="Bachillerato"
            />
          </React.Fragment>
        )}
      </Stack>
    </Box>
  );
};

export default StudentInfo;
