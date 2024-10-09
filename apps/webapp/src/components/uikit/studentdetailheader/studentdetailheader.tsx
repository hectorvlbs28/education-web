import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { AppBar, Toolbar, Box, Stack, IconButton } from '@mui/material';
import Typographies from '../../../components/uikit/typographies/typographies';
import { enumsTypographies } from '../../../utils/enums';
import { setStudentDetailTab } from '../../../redux/slices/navigation';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/use-redux/use-redux';
import {
  STROKE_GREY,
  WHITE_BG,
  TEXT_PRIMARY,
  STROKE_GREY_250,
} from '../../../assets/globalcolors';

const navItems = [
  {
    label: 'Documentación',
    value: 0,
  },
  {
    label: 'Historial de Pagos',
    value: 1,
  },
  {
    label: 'Cursos realizados',
    value: 2,
  },
];

const StudentDetailHeader = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const studentDetailTab = useAppSelector(
    (state) => state.navigationSlice.studentDetailTab
  );

  const handleBack = () => {
    dispatch(setStudentDetailTab(0));
    navigate(-1);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setStudentDetailTab(newValue));
  };

  return (
    <Stack
      direction="column"
      spacing={8}
      sx={{
        backgroundColor: STROKE_GREY_250,
      }}
    >
      <AppBar
        component="nav"
        sx={{
          backgroundColor: WHITE_BG,
          border: `1px solid ${STROKE_GREY}`,
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="flex-start"
            sx={{
              width: '400px',
            }}
          >
            <IconButton onClick={handleBack}>
              <ArrowBackIcon
                sx={{
                  color: TEXT_PRIMARY,
                }}
              />
            </IconButton>

            <Typographies
              label="Detalles del aspirante"
              type={enumsTypographies.body1}
              color={TEXT_PRIMARY}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            sx={{ width: '100%' }}
          >
            <Tabs
              value={studentDetailTab}
              onChange={handleChange}
              centered
              textColor="primary"
              indicatorColor="primary"
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
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: '80vh',
          backgroundColor: STROKE_GREY_250,
        }}
      >
        <Outlet />
      </Box>
    </Stack>
  );
};

export default StudentDetailHeader;
