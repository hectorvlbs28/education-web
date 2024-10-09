import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Navigate from '../../components/buttons/navigate/navigate';
import Paths from '../../utils/paths';
import apiService from '../../services/api';
import GetCoursesResponse from '../../interfaces/GetCoursesResponse';
import { enumsFormType } from '../../utils/enums';
import { setCourse } from '../../redux/slices/enroll';
import { Students } from '../../services/apis';
import { setCourses } from '../../redux/slices/user';
import {
  useAppDispatch,
  useUserCourses,
} from '../../hooks/use-redux/use-redux';

interface Course {
  id: string;
  name: string;
  startDate: string;
  schedule: string;
}

export function Header() {
  const dispatch = useAppDispatch();
  const userCourses = useUserCourses();

  const [localCourses, setLocalCourses] = useState<Course[]>([]);

  const handleAction = (course: Course) => {
    const { name, startDate, schedule, id } = course;
    const formTypeMapping: { [key: string]: string } = {
      'Diseño de modas': enumsFormType.modas,
      'Curso de Lectra': enumsFormType.lectra,
      'Curso de Gerber': enumsFormType.gerber,
      'Modelado de maniquí': enumsFormType.maniqui,
    };

    const courseToSet = {
      formType: formTypeMapping[name] || '',
      selectedCourse: name,
      courseStartDate: startDate,
      courseSchedule: schedule,
      courseId: id,
      price: 5750,
    };

    dispatch(setCourse(courseToSet));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentResponse = (await apiService.get(
          Students.getCourses
        )) as GetCoursesResponse;
        const courses = studentResponse.data.map((course) => {
          return {
            id: course.id,
            name: course.name,
            startDate: '24 de agosto 2024',
            schedule: 'Sábado de 9 a 14 hrs.',
          };
        });
        dispatch(setCourses({ courses }));
      } catch (error: any) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (userCourses.length > 0) {
      setLocalCourses(userCourses);
    }
  }, [userCourses]);

  return (
    <Box
      sx={{
        p: 4,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: 2,
        }}
      >
        <Navigate text="Inicio" path={Paths.Home} />

        {localCourses.map((course, idx) => {
          return (
            <Navigate
              key={idx}
              text={course.name}
              path={Paths.Enroll}
              handleAction={() => handleAction(course)}
            />
          );
        })}

        <Navigate text="Iniciar sesión" path={Paths.Login} />

        <Navigate text="Inicio estudiantes" path={Paths.Students.Home} />

        <Navigate text="Inicio administrador" path={Paths.Admin.Home} />
        <Navigate text="Inicio Aspirantes" path={Paths.Applicants.Home} />
      </Box>

      <Outlet />
    </Box>
  );
}

export default Header;
