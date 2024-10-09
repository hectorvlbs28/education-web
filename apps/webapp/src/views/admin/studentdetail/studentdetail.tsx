import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import StudentDocumentation from '../../../components/studentdetail/studentdocumentation/studentdocumentation';
import StudentPaymentHistory from '../../../components/studentdetail/studentpaymenthistory/studentpaymenthistory';
import StudentCoursesTaken from '../../../components/studentdetail/studentcoursestaken/studentcoursestaken';
import StudentInfo from '../../../components/studentdetail/studentinfo/studentinfo';
import Typographies from '../../../components/uikit/typographies/typographies';
import StudentInfoRow from '../../../components/studentdetail/studentinforow/studentinforow';
import { enumsTypographies } from '../../../utils/enums';
import { useAppSelector } from '../../../hooks/use-redux/use-redux';
import { TEXT_PRIMARY, WHITE_BG } from '../../../assets/globalcolors';

const StudentDetail = () => {
  const location = useLocation();
  const studentDetailTab = useAppSelector(
    (state) => state.navigationSlice.studentDetailTab
  );

  const [isApplicant, setIsApplicant] = useState(false);

  useEffect(() => {
    setIsApplicant(location.pathname.includes('applicants'));
  }, [location]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      alignContent="center"
      justifyContent="flex-start"
      sx={{
        width: '100%',
      }}
    >
      <StudentInfo />

      <Box
        display="flex"
        flexDirection="column"
        alignContent="center"
        justifyContent="flex-start"
        sx={{
          width: '100%',
          p: '10px 30px 20px 30px',
        }}
      >
        <Typographies
          label="Curso seleccionado"
          type={enumsTypographies.body3Bold}
          color={TEXT_PRIMARY}
          extraStyles={{ mb: '20px' }}
        />

        <Box
          display="flex"
          flexDirection="row"
          alignContent="center"
          justifyContent="space-between"
          sx={{
            width: '100%',
            p: '20px 30px 20px 30px',
            backgroundColor: WHITE_BG,
            mb: '20px',
          }}
        >
          <StudentInfoRow label="Nombre del curso" value="Diseño de Modas" />
          <StudentInfoRow
            label="Fecha de inicio del curso"
            value="24 de agosto de 2024"
          />
          <StudentInfoRow label="Horario" value="Sábado de 9 a 14 hrs." />
          <StudentInfoRow label="Modalidad" value="Hibrído" />
        </Box>

        {studentDetailTab === 0 && (
          <StudentDocumentation isApplicant={isApplicant} />
        )}
        {studentDetailTab === 1 && (
          <StudentPaymentHistory isApplicant={isApplicant} />
        )}
        {studentDetailTab === 2 && (
          <StudentCoursesTaken isApplicant={isApplicant} />
        )}
      </Box>
    </Box>
  );
};

export default StudentDetail;
