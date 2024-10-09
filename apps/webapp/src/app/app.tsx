import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Backdrop, CircularProgress } from '@mui/material';
import Paths from '../utils/paths';
import Header from '../views/header/header';
import Home from '../views/home/home';
import Login from '../views/login/login';
import ForgotPassword from '../views/forgotpassword/forgotpassword';
import SignUp from '../views/signup/signup';
import Enroll from '../views/enroll/enroll';
import FormView from '../views/common/formview/formview';
import StudentsHome from '../views/students/studentshome/studentshome';
import StudentsMyAccount from '../views/students/studentsmyaccount/studentsmyaccount';
import StudentsAcademicOffer from '../views/students/studentsacademicoffer/studentsacademicoffer';
import AdminHome from '../views/admin/adminhome/adminhome';
import AdminApplicants from '../views/admin/adminapplicants/adminapplicants';
import AdminStudents from '../views/admin/adminstudents/adminstudents';
import AdminGroups from '../views/admin/admingroups/admingroups';
import AdminPayments from '../views/admin/adminpayments/adminpayments';
import LeftDrawer from '../components/uikit/leftdrawer/leftdrawer';
import PrivateRoute from '../components/redux/privateroute/privateroute';
import useMediaquery from '../hooks/use-mediaquery/use-mediaquery';
import SvgIcons from '../utils/iconsEnums';
import MenuItemInterface from '../interfaces/MenuItemInterface';
import StudentDetail from '../views/admin/studentdetail/studentdetail';
import StudentDetailHeader from '../components/uikit/studentdetailheader/studentdetailheader';
import { useAppSelector } from '../hooks/use-redux/use-redux';
import {
  RADIO_SELECTED,
  MAIN_VIOLET,
  ERROR,
  STROKE_GREY,
  MAIN_VIOLEN_SHADOW,
  WHITE_BG,
  ERROR_SHADOW,
  TEXT_DISABLED,
  BORDER_BLUE,
} from '../assets/globalcolors';
import RouteApplicants from '../views/applicants';
import { options } from '../views/applicants/menu-sidebar/menu-side';
import MyAccount from '../views/applicants/my-account/MyAccount';
import AcademicOffer from '../views/applicants/academic-offer/AcademicOffer';
import HomeApplicants from '../views/applicants/home/Home';

const studentsMenu: MenuItemInterface[] = [
  {
    label: 'Inicio',
    path: Paths.Students.Home,
    icon: SvgIcons.HouseSimple,
    activeIcon: SvgIcons.HouseSimpleViolet,
  },
  {
    label: 'Mi cuenta',
    path: Paths.Students.MyAccount,
    icon: SvgIcons.UserCircle,
    activeIcon: SvgIcons.UserCircleViolet,
  },
  {
    label: 'Oferta Académica',
    path: Paths.Students.AcademicOffer,
    icon: SvgIcons.Student,
    activeIcon: SvgIcons.StudentViolet,
  },
];

const adminMenu: MenuItemInterface[] = [
  {
    label: 'Inicio',
    path: Paths.Admin.Home,
    icon: SvgIcons.HouseSimple,
    activeIcon: SvgIcons.HouseSimpleViolet,
  },
  {
    label: 'Aspirantes',
    path: Paths.Admin.Applicants,
    icon: SvgIcons.Users,
    activeIcon: SvgIcons.UsersViolet,
  },
  {
    label: 'Alumnos',
    path: Paths.Admin.Students,
    icon: SvgIcons.Student,
    activeIcon: SvgIcons.StudentViolet,
  },
  {
    label: 'Grupos',
    path: Paths.Admin.Groups,
    icon: SvgIcons.UsersFour,
    activeIcon: SvgIcons.UsersFourViolet,
  },
  {
    label: 'Pagos',
    path: Paths.Admin.Payments,
    icon: SvgIcons.CreditCard,
    activeIcon: SvgIcons.CreditCardViolet,
  },
];

export function App() {
  const { isMobile, isTablet, isDesktop, isLargeDesktop, isExtraLargeDesktop } =
    useMediaquery();
  const selecteBackdrop = useAppSelector(
    (state) => state.navigationSlice.backdrop
  );
  const showToast = useAppSelector((state) => state.navigationSlice.showToast);
  const toastMessage = useAppSelector(
    (state) => state.navigationSlice.toastMessage
  );
  const toastIcon = useAppSelector((state) => state.navigationSlice.toastIcon);
  const [MuiInputBaseHeight, setMuiInputBaseHeight] = React.useState('50px');

  const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            '&.Mui-checked': {
              color: RADIO_SELECTED,
            },
          },
        },
      },
      MuiCircularProgress: {
        styleOverrides: {
          root: {
            color: MAIN_VIOLET,
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: MAIN_VIOLET,

            '&.Mui-checked': {
              color: RADIO_SELECTED,
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Inter, sans-serif',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: MuiInputBaseHeight,
            borderRadius: '5px',
            padding: '10px, 14px, 10px, 14px',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: STROKE_GREY,
              },
              '&:hover fieldset': {
                borderColor: MAIN_VIOLET,
                boxShadow: `0px 0px 0px 2px ${MAIN_VIOLEN_SHADOW}`,
              },
              '&.Mui-focused fieldset': {
                borderColor: MAIN_VIOLET,
                boxShadow: `0px 0px 0px 2px ${MAIN_VIOLEN_SHADOW}`,
              },
              '&.Mui-error fieldset': {
                borderColor: ERROR,
                boxShadow: `0px 0px 0px 2px ${ERROR_SHADOW}`,
              },
              '&.Mui-disabled': {
                '& fieldset': {
                  borderColor: STROKE_GREY,
                  boxShadow: 'none',
                },
                '&:hover fieldset': {
                  borderColor: STROKE_GREY,
                  boxShadow: 'none',
                },
                '& .MuiInputBase-input': {
                  color: TEXT_DISABLED,
                },
              },
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: WHITE_BG,
            color: MAIN_VIOLET,
            fontSize: '15px',
            padding: '10px',
            borderRadius: '10px',
            boxShadow: '0px 0px 0px 2px rgba(160, 47, 236, 0.2)',
            border: `1px solid ${MAIN_VIOLET}`,
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: STROKE_GREY,
              },
              '&:hover fieldset': {
                borderColor: MAIN_VIOLET,
                boxShadow: `0px 0px 0px 2px ${MAIN_VIOLEN_SHADOW}`,
              },
              '&.Mui-focused fieldset': {
                borderColor: MAIN_VIOLET,
                boxShadow: `0px 0px 0px 2px ${MAIN_VIOLEN_SHADOW}`,
              },
              '&.Mui-error fieldset': {
                borderColor: ERROR,
                boxShadow: `0px 0px 0px 2px ${ERROR_SHADOW}`,
              },
              '&.Mui-disabled': {
                '& fieldset': {
                  borderColor: STROKE_GREY,
                  boxShadow: 'none',
                },
                '&:hover fieldset': {
                  borderColor: STROKE_GREY,
                  boxShadow: 'none',
                },
                '& .MuiInputBase-input': {
                  color: TEXT_DISABLED,
                },
              },
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.Mui-selected': { background: MAIN_VIOLEN_SHADOW },
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            border: 'none',
            borderRadius: '1px',
            boxShadow: 'none',
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            '& .MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            '&.MuiTab-textColorPrimary': {
              color: MAIN_VIOLET,
              '&.Mui-selected': {
                backgroundColor: MAIN_VIOLEN_SHADOW,
                borderRadius: '5px',
                border: `1px solid ${MAIN_VIOLEN_SHADOW}`,
              },
            },
            '&.MuiTab-textColorSecondary': {
              color: BORDER_BLUE,
              '&.Mui-selected': {
                borderRadius: '5px',
                border: `1px solid ${BORDER_BLUE}`,
              },
            },
          },
        },
      },
    },
  });

  const notify = (message: string, icon: React.ReactNode) =>
    toast(message, {
      duration: 3000,
      icon: icon as React.ReactElement,
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });

  React.useEffect(() => {
    if (showToast) {
      notify(toastMessage, toastIcon);
    }
  }, [showToast, toastMessage, toastIcon]);

  React.useEffect(() => {
    const heightMap = {
      mobile: '32px',
      tablet: '40px',
      desktop: '50px',
      largeDesktop: '50px',
      extraLargeDesktop: '50px',
    };

    if (isMobile) {
      setMuiInputBaseHeight(heightMap.mobile);
    } else if (isTablet) {
      setMuiInputBaseHeight(heightMap.tablet);
    } else if (isDesktop || isLargeDesktop || isExtraLargeDesktop) {
      setMuiInputBaseHeight(heightMap.desktop);
    }
  }, [isMobile, isTablet, isDesktop, isLargeDesktop, isExtraLargeDesktop]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Toaster position="top-right" reverseOrder={false} />

      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={selecteBackdrop}
      >
        <CircularProgress />
      </Backdrop>

      <Routes>
        <Route element={<Header />}>
          <Route path={Paths.Home} element={<Home />} />
        </Route>

        <Route element={<FormView />}>
          <Route element={<PrivateRoute />}>
            <Route path={Paths.Enroll} element={<Enroll />} />
          </Route>

          <Route path={Paths.SignUp} element={<SignUp />} />
          <Route path={Paths.Login} element={<Login />} />
        </Route>

        <Route path={Paths.ForgotPassword} element={<ForgotPassword />} />

        <Route element={<LeftDrawer menu={studentsMenu} />}>
          <Route path={Paths.Students.Home} element={<StudentsHome />} />
          <Route
            path={Paths.Students.MyAccount}
            element={<StudentsMyAccount />}
          />
          <Route
            path={Paths.Students.AcademicOffer}
            element={<StudentsAcademicOffer />}
          />
        </Route>
        <Route element={<LeftDrawer menu={options} />}>
          <Route path={Paths.Applicants.Home} element={<HomeApplicants />} />
          <Route path={Paths.Applicants.MyAccount} element={<MyAccount />} />
          <Route
            path={Paths.Applicants.AcademicOffer}
            element={<AcademicOffer />}
          />
        </Route>
        <Route element={<LeftDrawer menu={adminMenu} />}>
          <Route path={Paths.Admin.Home} element={<AdminHome />} />
          <Route path={Paths.Admin.Applicants} element={<AdminApplicants />} />
          <Route path={Paths.Admin.Students} element={<AdminStudents />} />
          <Route path={Paths.Admin.Groups} element={<AdminGroups />} />
          <Route path={Paths.Admin.Payments} element={<AdminPayments />} />
        </Route>

        <Route element={<StudentDetailHeader />}>
          <Route
            path={Paths.Admin.ApplicantDetail}
            element={<StudentDetail />}
          />

          <Route path={Paths.Admin.StudentDetail} element={<StudentDetail />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
