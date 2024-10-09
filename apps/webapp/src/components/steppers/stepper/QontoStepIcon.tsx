
import { Box, Stepper, Step, StepLabel } from '@mui/material';
import { StepIconProps } from '@mui/material/StepIcon';
import SvgIcons from '../../../utils/iconsEnums';
const QontoStepIcon = (props: StepIconProps) => {
    const { active, completed } = props;
  
    return (
      <Box
        sx={{
          width: 'auto',
          height: 'auto',
          backgroundColor: 'transparent',
        }}
      >
        {active ? (
          <img
            src={SvgIcons.ActiveStep}
            alt="ActiveStep"
            style={{
              width: 20,
              height: 20,
            }}
          />
        ) : completed ? (
          <img
            src={SvgIcons.DoneStep}
            alt="DoneStep"
            style={{
              width: 20,
              height: 20,
            }}
          />
        ) : (
          <img
            src={SvgIcons.InactiveStep}
            alt="InactiveStep"
            style={{
              width: 20,
              height: 20,
            }}
          />
        )}
      </Box>
    );
  };

  export default QontoStepIcon;