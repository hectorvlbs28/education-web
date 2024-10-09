import * as React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Box, IconButton } from '@mui/material';
import Header from '../../../components/formview/header/header';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import Paths from '../../../utils/paths';
import imagesEnums from '../../../utils/imagesEnums';
import { setActiveStep } from '../../../redux/slices/navigation';
import { resetAll } from '../../../redux/slices/enroll';
import { enumsFormType } from '../../../utils/enums';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../hooks/use-redux/use-redux';
import { STROKE_GREY_250, TEXT } from '../../../assets/globalcolors';

const FormView = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    isExtraLargeDesktop,
    isLargeDesktop,
    isDesktop,
    isTablet,
    is768x1024,
    is1114x705,
  } = UseMediaquery();
  const activeStep = useAppSelector(
    (state) => state.navigationSlice.activeStep
  );
  const formType = useAppSelector((state) => state.enrollSlice.formType);

  const [containerWidth, setContainerWidth] = React.useState('0%');
  const [orientation, setOrientation] = React.useState('row');
  const [displayImage, setDisplayImage] = React.useState(true);
  const [outletWidth, setOutletWidth] = React.useState('0%');
  const [outletPadding, setOutletPadding] = React.useState(4);
  const [background, setBackground] = React.useState('');

  const handleBack = () => {
    if (activeStep === 0) return;

    dispatch(setActiveStep(activeStep - 1));
  };

  const handleReturnNavigate = () => {
    navigate(Paths.Home);
    dispatch(setActiveStep(0));
    dispatch(resetAll());
  };

  React.useEffect(() => {
    setContainerWidth('40%');
    setOutletWidth('60%');
    setOutletPadding(4);

    if (isTablet || is768x1024 || is1114x705) {
      setOrientation('column');
      setContainerWidth('100%');
      setDisplayImage(false);
      setOutletWidth('100%');
      setOutletPadding(2);
    } else {
      setOrientation('row');
      setContainerWidth('40%');
      setDisplayImage(true);
      setOutletWidth('60%');
      setOutletPadding(4);
    }
  }, [
    isExtraLargeDesktop,
    isLargeDesktop,
    isDesktop,
    isTablet,
    is768x1024,
    is1114x705,
  ]);

  React.useEffect(() => {
    switch (formType) {
      case enumsFormType.modas:
        setBackground(imagesEnums.modas);
        break;
      case enumsFormType.lectra:
        setBackground(imagesEnums.lectra);
        break;
      case enumsFormType.gerber:
        setBackground(imagesEnums.gerber);
        break;
      case enumsFormType.maniqui:
        setBackground(imagesEnums.maniqui);
        break;
      default:
        break;
    }
  }, [formType]);

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: orientation,
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          width: containerWidth,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          height: orientation === 'row' ? '100vh' : 'auto',
          position: orientation === 'row' ? 'fixed' : 'sticky',
        }}
      >
        <Header handleAction={handleBack} />

        {displayImage && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${background})`,
              backgroundSize: '100% 100%',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </Box>

      <Box
        sx={{
          backgroundColor: STROKE_GREY_250,
          width: outletWidth,
          minHeight: '100vh',
          padding: outletPadding,
          marginLeft: 'auto',
          overflowY: 'auto',
        }}
      >
        <Outlet />

        <IconButton
          onClick={handleReturnNavigate}
          sx={{
            color: TEXT,
            position: 'fixed',
            right: 16,
            top: 16,
          }}
        >
          <CloseIcon
            sx={{
              width: 26,
              height: 26,
              color: TEXT,
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default FormView;
