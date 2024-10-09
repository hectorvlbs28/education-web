import StepConnector, {
    stepConnectorClasses,
  } from '@mui/material/StepConnector';
  import { styled } from '@mui/material/styles';
  import {
    MAIN_VIOLET,
    STROKE_GREY,
  } from '../../../assets/globalcolors';
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 10,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: MAIN_VIOLET,
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        borderColor: MAIN_VIOLET,
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: STROKE_GREY,
      borderTopWidth: 3,
      borderRadius: 1, 
    },
  }));

  export default QontoConnector;