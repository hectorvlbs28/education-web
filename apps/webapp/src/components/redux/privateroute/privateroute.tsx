import * as React from 'react';
import WarningIcon from '@mui/icons-material/Warning';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Paths from '../../../utils/paths';
import { FORM_HEADER_BG_YELLOW } from '../../../assets/globalcolors';
import { setShowToast } from '../../../redux/slices/navigation';
import {
  useAppSelector,
  useAppDispatch,
} from '../../../hooks/use-redux/use-redux';

const PrivateRoute = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isLogedIn = useAppSelector((state) => state.userSlice.isLogedIn);

  React.useEffect(() => {
    if (!isLogedIn) {
      dispatch(
        setShowToast({
          showToast: true,
          toastMessage:
            'Por favor, inicie sesión ó cree una cuenta para continuar con la inscripción.',
          toastIcon: (
            <WarningIcon
              sx={{
                color: FORM_HEADER_BG_YELLOW,
              }}
            />
          ),
        })
      );
    }
  }, [dispatch, isLogedIn]);

  return isLogedIn ? (
    <Outlet />
  ) : (
    <Navigate to={Paths.Login} state={{ from: location }} />
  );
};

export default PrivateRoute;
