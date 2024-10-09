import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Grid,
  Divider,
  styled,
} from '@mui/material';
import QontoConnector from './QontoConnector';
import QontoStepIcon from './QontoStepIcon';
import { enumsTypographies } from '../../../utils/enums';
import { MAIN_VIOLET } from '../../../assets/globalcolors';
import Typographies from '../../uikit/typographies/typographies';
const activeStep = 0;
interface IPropsStepperEnrollment {
    steps: string[]
}
const StepperEnrollment = (props: IPropsStepperEnrollment) => {
    const { steps } = props;
  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      connector={<QontoConnector />}      
      sx={{
        width: '100%',
      }}
    >
      {steps.map((label) => {
        const stepProps: { completed?: boolean } = {};
        return (
          <Step key={label} {...stepProps}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <Typographies
                label={label}
                type={enumsTypographies.body4}
                color={MAIN_VIOLET}
                align="center"
                extraStyles={{
                  mt: '-1rem',
                }}
              />
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
export default StepperEnrollment;
