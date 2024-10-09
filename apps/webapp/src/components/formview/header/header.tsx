import * as React from 'react';
import { Box, Avatar, Typography } from '@mui/material';
import BackButton from '../backbutton/backbutton';
import UseMediaquery from '../../../hooks/use-mediaquery/use-mediaquery';
import SvgIcons from '../../../utils/iconsEnums';
import { enumsFormType } from '../../../utils/enums';
import { useAppSelector } from '../../../hooks/use-redux/use-redux';
import {
  FORM_HEADER_BG_VIOLET,
  FORM_HEADER_TEXT_VIOLET,
  FORM_HEADER_BG_YELLOW,
  FORM_HEADER_TEXT_YELLOW,
  FORM_HEADER_BG_PINK,
  FORM_HEADER_TEXT_PINK,
  FORM_HEADER_BG_BLUE,
  FORM_HEADER_TEXT_BLUE,
} from '../../../assets/globalcolors';

type Props = {
  handleAction: () => void;
};

const Header = ({ handleAction }: Props) => {
  const { isMobile } = UseMediaquery();
  const selectedCourse = useAppSelector(
    (state) => state.enrollSlice.selectedCourse
  );
  const courseStartDate = useAppSelector(
    (state) => state.enrollSlice.courseStartDate
  );
  const courseSchedule = useAppSelector(
    (state) => state.enrollSlice.courseSchedule
  );
  const formType = useAppSelector((state) => state.enrollSlice.formType);

  const [containerHeight, setContainerHeight] = React.useState('0px');
  const [background, setBackground] = React.useState('');
  const [textColor, setTextColor] = React.useState('');
  const [icon, setIcon] = React.useState('');

  React.useEffect(() => {
    if (isMobile) {
      setContainerHeight('220px');
    } else {
      setContainerHeight('200px');
    }
  }, [isMobile]);

  React.useEffect(() => {
    switch (formType) {
      case enumsFormType.modas:
        setBackground(FORM_HEADER_BG_VIOLET);
        setTextColor(FORM_HEADER_TEXT_VIOLET);
        setIcon(SvgIcons.DressIcon);
        break;
      case enumsFormType.lectra:
        setBackground(FORM_HEADER_BG_YELLOW);
        setTextColor(FORM_HEADER_TEXT_YELLOW);
        setIcon(SvgIcons.LectraIcon);
        break;
      case enumsFormType.gerber:
        setBackground(FORM_HEADER_BG_PINK);
        setTextColor(FORM_HEADER_TEXT_PINK);
        setIcon(SvgIcons.GerberIcon);
        break;
      case enumsFormType.maniqui:
        setBackground(FORM_HEADER_BG_BLUE);
        setTextColor(FORM_HEADER_TEXT_BLUE);
        setIcon(SvgIcons.ManiquiIcon);
        break;
      default:
        break;
    }
  }, [formType]);

  return (
    <Box
      sx={{
        background: background,
        height: containerHeight,
        padding: 3,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: isMobile ? 4 : 2,
      }}
    >
      <BackButton textColor={textColor} handleAction={handleAction} />

      <Box
        sx={{
          width: '100%',
          minHeight: 'auto',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: isMobile ? 1 : 2,
        }}
      >
        <Avatar>
          <img src={icon} alt="icon" />
        </Avatar>

        <Box
          sx={{
            width: '100%',
            minHeight: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              color: textColor,
            }}
          >
            Curso seleccionado
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: textColor,
              mb: '4px',
              fontWeight: 'bold',
            }}
          >
            {selectedCourse}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: textColor,
            }}
          >
            Fecha de inicio: {courseStartDate}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: textColor,
            }}
          >
            Horario: {courseSchedule}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
